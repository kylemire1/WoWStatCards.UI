import { QueryFunction } from "@tanstack/react-query";
import {
  characterStatsClient,
  statCardClient,
} from "lib/generated-api/api-clients";
import { StatCardDto } from "lib/generated-api/StatCardApi";
import { StatDto } from "lib/generated-api/types";
import { executeAsync, handleError } from "./utils";

const fetchCharacterStats: QueryFunction<
  StatDto,
  [
    string,
    {
      characterName: string;
      realm: string;
    }
  ]
> = async ({ queryKey }) => {
  const [_key, { characterName, realm }] = queryKey;

  if (!realm || !characterName || realm === "" || characterName === "") {
    return handleError(new Error("All fields are required"));
  }

  return await executeAsync(async () => {
    const response = await characterStatsClient.get(
      characterName,
      realm,
      process.env.NEXT_PUBLIC_BLIZZ_CLIENT_ID
    );

    return response.result;
  });
};

const createStatCard = async (newCard: StatCardDto) => {
  return await executeAsync(async () => {
    const response = await statCardClient.create(newCard);

    return response.result;
  });
};

const getStatCard: QueryFunction<
  StatCardDto,
  [
    string,
    {
      id?: number;
    }
  ]
> = async ({ queryKey }) => {
  const [_key, { id }] = queryKey;

  if (id === undefined) {
    return handleError(
      new Error("Could not get a stat card with the given ID")
    );
  }

  return await executeAsync(async () => {
    const response = await statCardClient.get(id);

    return response.result;
  });
};

const listStatCards: QueryFunction<Array<StatCardDto>> = async () => {
  return await executeAsync<Array<StatCardDto>>(async () => {
    const response = await statCardClient.getAll();

    return response.result;
  });
};

const deleteStatCard = async (cardId?: number) => {
  if (!cardId) return;

  await executeAsync(async () => {
    await statCardClient.delete(cardId);
  });
};

const updateStatCard = async ({
  cardId,
  statCardDto,
}: {
  cardId?: number;
  statCardDto?: StatCardDto;
}) => {
  return await executeAsync(async () => {
    if (cardId === undefined || !statCardDto) return;

    const response = await statCardClient.update(cardId, statCardDto);

    return response.result;
  });
};

const fetchers = {
  mutations: {
    updateStatCard,
    deleteStatCard,
    createStatCard,
  },
  queries: {
    fetchCharacterStats,
    getStatCard,
    listStatCards,
  },
};

export default fetchers;
