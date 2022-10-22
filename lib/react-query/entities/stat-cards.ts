import { QueryFunction } from '@tanstack/react-query'
import { StatCardDto } from 'lib/generated-api/StatCardApi'
import { StatDto } from 'lib/generated-api/custom-types'
import { http } from 'lib/http'
import { characterStatsFetcher, statCardCreator } from '../fetchers'

type MyQueryFunction<TReturnType, TArgs> = QueryFunction<TReturnType, [string, TArgs]>

const getCharacterStats: MyQueryFunction<
  StatDto,
  {
    characterName: string
    realm: string
  }
> = async ({ queryKey: [_key, args] }) => {
  const response = await characterStatsFetcher(args)

  return response.result
}

const createStatCard = async (newCard: StatCardDto) => {
  const response = await statCardCreator({ newCard })

  return response.result
}

const getStatCard: QueryFunction<
  StatCardDto,
  [
    string,
    {
      id?: number
    }
  ]
> = async ({ queryKey }) => {
  const [_key, { id }] = queryKey

  if (!id) throw new Error('Missing Id')

  try {
    const result = await http.get(`/api/StatCards/${id}`)
    return result.data
  } catch (error) {
    throw error instanceof Error ? error : new Error('Problem getting stat card')
  }
}

const getAllStatCards = async () => {
  try {
    const result = await http.get(`/api/StatCards`)
    return result.data
  } catch (error) {
    throw error instanceof Error ? error : new Error('Problem getting all stat cards')
  }
}

const deleteStatCard = async (cardId?: number) => {
  if (!cardId) throw new Error('Missing cardId')

  try {
    await http.delete(`/api/StatCards/${cardId}`)
  } catch (error) {
    throw error instanceof Error ? error : new Error('Problem getting all stat cards')
  }
}

const updateStatCard = async ({
  cardId,
  statCardDto,
}: {
  cardId?: number
  statCardDto?: StatCardDto
}) => {
  if (cardId === undefined || !statCardDto)
    throw new Error('Missing arguments in update card request')

  try {
    const result = await http.put<StatCardDto>(`/api/StatCards/${cardId}`)
    return result.data
  } catch (error) {
    throw error instanceof Error ? error : new Error('Problem getting all stat cards')
  }
}

const StatCards = {
  queries: {
    getStatCard,
    getAllStatCards,
    getCharacterStats,
  },
  mutations: {
    createStatCard,
    updateStatCard,
    deleteStatCard,
  },
}

export default StatCards
