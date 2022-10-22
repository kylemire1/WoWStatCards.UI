import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { StatCardDto } from '../generated-api/StatCardApi'
import { StatCards } from './entities'

export enum QueryKeyEnum {
  getAllStatCards = 'statCards',
  getCharacterStats = 'characterStats',
  getStatCard = 'statCard',
  me = 'me',
}

export const useGetAllStatCardsQuery = () => {
  const statCards = useQuery<Array<StatCardDto>>(
    [QueryKeyEnum.getAllStatCards],
    StatCards.queries.getAllStatCards
  )

  return statCards
}

export const useGetCharacterStatsQuery = ({
  characterName,
  realm,
}: {
  characterName: string
  realm: string
}) => {
  const characterStats = useQuery(
    [QueryKeyEnum.getCharacterStats, { characterName, realm }],
    StatCards.queries.getCharacterStats
  )

  return characterStats
}

export const useSaveStatCardMutation = () => {
  const saveStatCard = useMutation(StatCards.mutations.createStatCard)

  return saveStatCard
}

type MutationHookProps = { queryClient: QueryClient }
export const useDeleteStatCardMutation = ({ queryClient }: MutationHookProps) => {
  const deleteCard = useMutation(StatCards.mutations.deleteStatCard, {
    onSuccess() {
      queryClient.invalidateQueries(['statCards'], {
        exact: true,
        refetchType: 'active',
      })
    },
  })

  return deleteCard
}

export const useGetStatCardQuery = (id?: number) => {
  const statCard = useQuery(
    [QueryKeyEnum.getStatCard, { id }],
    StatCards.queries.getStatCard
  )

  return statCard
}

export const useUpdateCardMutation = ({ queryClient }: MutationHookProps) => {
  const updateCard = useMutation(StatCards.mutations.updateStatCard, {
    onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries([QueryKeyEnum.getStatCard], {
          exact: true,
          refetchType: 'active',
        })
      }
    },
  })

  return updateCard
}
