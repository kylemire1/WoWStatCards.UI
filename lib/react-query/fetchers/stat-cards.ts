import { QueryFunction } from '@tanstack/react-query'
import { characterStatsClient, statCardClient } from 'lib/generated-api/api-clients'
import { ApiException, StatCardDto } from 'lib/generated-api/StatCardApi'
import { StatDto } from 'lib/generated-api/types'
import { handleIfNotSuccess } from 'lib/utils'

const getCharacterStats: QueryFunction<
  StatDto,
  [
    string,
    {
      characterName: string
      realm: string
    }
  ]
> = async ({ queryKey }) => {
  const [_key, { characterName, realm }] = queryKey

  if (!realm || !characterName || realm === '' || characterName === '') return

  try {
    const response = await characterStatsClient.get(
      characterName,
      realm,
      process.env.NEXT_PUBLIC_BLIZZ_CLIENT_ID
    )

    handleIfNotSuccess(response)

    return response.result
  } catch (error: unknown) {
    if (error instanceof ApiException) {
      throw new Error(error.message)
    }
  }
}

const createStatCard = async (newCard: StatCardDto) => {
  const response = await statCardClient.create(newCard)

  handleIfNotSuccess(response)

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

  if (!id) return []

  const response = await statCardClient.get(id)

  handleIfNotSuccess(response)

  return response.result
}

const getAllStatCards = async () => {
  const response = await statCardClient.getAll()

  handleIfNotSuccess(response)

  return response.result
}

const deleteStatCard = async (cardId?: number) => {
  if (!cardId) return

  const response = await statCardClient.delete(cardId)

  handleIfNotSuccess(response)
}

const updateStatCard = async ({
  cardId,
  statCardDto,
}: {
  cardId?: number
  statCardDto?: StatCardDto
}) => {
  if (cardId === undefined || !statCardDto) return

  const response = await statCardClient.update(cardId, statCardDto)

  handleIfNotSuccess(response)

  return response.result
}

const fetchers = {
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

export default fetchers
