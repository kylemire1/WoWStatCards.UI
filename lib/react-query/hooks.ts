import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { StatCardDto } from "lib/generated-api/StatCardApi";
import { accountFetchers, statCardsFetchers } from "./fetchers";

export enum QueryKeyEnum {
  GetStatCard = "getStatCard",
  ListStatCards = "listStatCards",
  CharacterStats = "characterStats",
  Me = "me",
}

export const useListStatCardsQuery = () => {
  const statCards = useQuery<Array<StatCardDto>>(
    [QueryKeyEnum.ListStatCards],
    statCardsFetchers.queries.listStatCards
  );

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
    [QueryKeyEnum.CharacterStats, { characterName, realm }],
    statCardsFetchers.queries.fetchCharacterStats
  );

  return { ...characterStats };
};

export const useMeQuery = ({ queryClient }: MutationHookProps) => {
  const me = useQuery([QueryKeyEnum.Me], accountFetchers.queries.me);

  return { ...me };
};

export const useSaveStatCardMutation = () => {
  const saveStatCard = useMutation(statCardsFetchers.mutations.createStatCard);

  return { ...saveStatCard };
};

type MutationHookProps = { queryClient: QueryClient };
export const useDeleteStatCardMutation = ({
  queryClient,
}: MutationHookProps) => {
  const deleteCard = useMutation(statCardsFetchers.mutations.deleteStatCard, {
    onSuccess() {
      queryClient.invalidateQueries([QueryKeyEnum.ListStatCards], {
        exact: true,
        refetchType: "active",
      });
    },
  });

  return { ...deleteCard };
};

export const useGetStatCardQuery = (id?: number) => {
  const statCard = useQuery(
    [QueryKeyEnum.GetStatCard, { id }],
    statCardsFetchers.queries.getStatCard
  );

  return { ...statCard };
};

export const useUpdateCardMutation = ({ queryClient }: MutationHookProps) => {
  const updateCard = useMutation(statCardsFetchers.mutations.updateStatCard, {
    onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries([QueryKeyEnum.GetStatCard], {
          exact: true,
          refetchType: "active",
        });
      }
    },
  });

  return { ...updateCard };
};

export const useLoginMutation = ({ queryClient }: MutationHookProps) => {
  const login = useMutation(accountFetchers.mutations.loginUser, {
    onSuccess(data) {
      if (data) {
        queryClient.setQueryData([QueryKeyEnum.Me], data);
      }
    },
  });

  return { ...login };
};
