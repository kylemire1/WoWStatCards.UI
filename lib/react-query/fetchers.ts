import {
  QueryClient,
  QueryFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
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

  if (!realm || !characterName || realm === "" || characterName === "") return;

  try {
    const response = await characterStatsClient.get(
      characterName,
      realm,
      process.env.NEXT_PUBLIC_BLIZZ_CLIENT_ID
    );

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

export const getStatCard: QueryFunction<
  StatCardDto,
  [
    string,
    {
      id?: number;
    }
  ]
> = async ({ queryKey }) => {
  const [_key, { id }] = queryKey;

  if (!id) return [];

  return await (await statCardClient.get(id)).toJSON();
};

export const listStatCards = async () => {
  return await (await statCardClient.getAll()).map((dto) => dto.toJSON());
};

export const deleteStatCard = async (cardId?: number) => {
  if (!cardId) return;
  return await statCardClient.delete(cardId);
};

export const updateStatCard = async ({
  cardId,
  statCardDto,
}: {
  cardId?: number;
  statCardDto?: StatCardDto;
}) => {
  if (cardId === undefined || !statCardDto) return;

  return await statCardClient.put(cardId, statCardDto);
};

export const useGetAllStatCardsQuery = () => {
  const statCards = useQuery<Array<StatCardDto>>(["statCards"], listStatCards);

  return { ...statCards };
};

export const useGetCharacterStatsQuery = ({
  characterName,
  realm,
}: {
  characterName: string;
  realm: string;
}) => {
  const characterStats = useQuery(
    ["characterStats", { characterName, realm }],
    fetchCharacterStats
  );

  return { ...characterStats };
};

export const useSaveStatCardMutation = () => {
  const saveStatCard = useMutation(createStatCard);

  return { ...saveStatCard };
};

type MutationHookProps = { queryClient: QueryClient };
export const useDeleteStatCardMutation = ({
  queryClient,
}: MutationHookProps) => {
  const deleteCard = useMutation(deleteStatCard, {
    onSuccess() {
      queryClient.invalidateQueries(["statCards"], {
        exact: true,
        refetchType: "active",
      });
    },
  });

  return { ...deleteCard };
};

export const useGetStatCardQuery = (id?: number) => {
  const statCard = useQuery(["statCard", { id }], getStatCard);

  return { ...statCard };
};

export const useUpdateCardMutation = ({ queryClient }: MutationHookProps) => {
  const updateCard = useMutation(updateStatCard, {
    onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries(["statCard"], {
          exact: true,
          refetchType: "active",
        });
      }
    },
  });

  return { ...updateCard };
};
