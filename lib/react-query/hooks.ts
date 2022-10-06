import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { StatCardDto } from "../generated-api/StatCardApi";
import {
  listStatCards,
  fetchCharacterStats,
  createStatCard,
  deleteStatCard,
  getStatCard,
  updateStatCard,
} from "./fetchers";

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
