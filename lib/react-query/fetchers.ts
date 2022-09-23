import { QueryFunction } from "@tanstack/react-query";
import {
  characterStatsClient,
  statCardClient,
} from "../generated-api/api-clients";
import {
  ApiException,
  StatCardDto,
  StatDto,
} from "../generated-api/StatCardApi";

export const fetchCharacterStats: QueryFunction<
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

  try {
    const response = await characterStatsClient.get(
      characterName,
      realm,
      process.env.NEXT_PUBLIC_BLIZZ_CLIENT_ID
    );
    console.log(response);
    if (!response) throw new Error("Error fetching character stats.");

    return response.toJSON();
  } catch (error: unknown) {
    if (error instanceof ApiException) {
      throw new Error(error.message);
    }
  }
};

export const createStatCard = async (newCard: StatCardDto) => {
  return await statCardClient.post(newCard);
};

export const listStatCards = async () => {
  return await (await statCardClient.getAll()).map((dto) => dto.toJSON());
};
