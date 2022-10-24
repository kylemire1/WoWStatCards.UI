import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { StatCardDto } from '../generated-api/StatCardApi'
import { StatCards } from './entities'

export enum QueryKeyEnum {
  StatCardsGetAll = 'statCards',
  CharacterStatsGet = 'characterStats',
  StatCardsGet = 'statCard',
  Me = 'me',
}

export const useGetAllStatCardsQuery = () => {
  const statCards = useQuery<Array<StatCardDto>>(
    [QueryKeyEnum.StatCardsGetAll],
    StatCards.queries.getAll
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
    [QueryKeyEnum.CharacterStatsGet, { characterName, realm }],
    StatCards.queries.getCharacterStats
  )

  return characterStats
}

export const useSaveStatCardMutation = () => {
  const saveStatCard = useMutation(StatCards.mutations.create)

  return saveStatCard
}

type MutationHookProps = { queryClient: QueryClient }
export const useDeleteStatCardMutation = ({
  queryClient,
}: MutationHookProps) => {
  const deleteCard = useMutation(StatCards.mutations.remove, {
    onSuccess() {
      queryClient.invalidateQueries([QueryKeyEnum.StatCardsGetAll], {
        exact: true,
        refetchType: 'active',
      })
    },
  })

  return deleteCard
}

export const useGetStatCardQuery = (id?: number) => {
  const statCard = useQuery(
    [QueryKeyEnum.StatCardsGet, { id }],
    StatCards.queries.get
  )

  return statCard
}

export const useUpdateCardMutation = ({ queryClient }: MutationHookProps) => {
  const updateCard = useMutation(StatCards.mutations.update, {
    onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries([QueryKeyEnum.StatCardsGet], {
          exact: true,
          refetchType: 'active',
        })
      }
    },
  })

  return updateCard
}
