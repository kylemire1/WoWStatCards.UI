import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { KEY_NAME, WEEK_IN_SECONDS } from 'lib/constants'
import { canUseDom, setLocalStorageItem } from 'lib/utils'
import { StatCardDto } from '../generated-api/StatCardApi'
import { accountFetchers, statCardsFetchers } from './fetchers'
import cookie from 'cookie'

export enum QueryKeyEnum {
  getAllStatCards = 'statCards',
  getCharacterStats = 'characterStats',
  getStatCard = 'statCard',
  me = 'me',
}

export const useGetAllStatCardsQuery = () => {
  const statCards = useQuery<Array<StatCardDto>>(
    [QueryKeyEnum.getAllStatCards],
    statCardsFetchers.queries.getAllStatCards
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
    statCardsFetchers.queries.getCharacterStats
  )

  return characterStats
}

export const useSaveStatCardMutation = () => {
  const saveStatCard = useMutation(statCardsFetchers.mutations.createStatCard)

  return saveStatCard
}

type MutationHookProps = { queryClient: QueryClient }
export const useDeleteStatCardMutation = ({ queryClient }: MutationHookProps) => {
  const deleteCard = useMutation(statCardsFetchers.mutations.deleteStatCard, {
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
    statCardsFetchers.queries.getStatCard
  )

  return statCard
}

export const useUpdateCardMutation = ({ queryClient }: MutationHookProps) => {
  const updateCard = useMutation(statCardsFetchers.mutations.updateStatCard, {
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

export const useLoginMutation = ({ queryClient }: MutationHookProps) => {
  const loginUser = useMutation(accountFetchers.mutations.loginUser, {
    onSuccess(data) {
      queryClient.setQueryData([QueryKeyEnum.me], data)
      setLocalStorageItem(KEY_NAME, data.token)
      if (canUseDom()) {
        document.cookie = cookie.serialize(KEY_NAME, data.token, {
          secure: process.env.NODE_ENV !== 'development',
          maxAge: WEEK_IN_SECONDS,
          sameSite: 'strict',
          path: '/',
        })
      }
    },
  })

  return loginUser
}

export const useMeQuery = () => {
  const currentUser = useQuery(
    [QueryKeyEnum.me],
    accountFetchers.queries.getCurrentUser
  )
  return currentUser
}
