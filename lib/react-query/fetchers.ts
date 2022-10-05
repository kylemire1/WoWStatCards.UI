import { QueryFunction } from '@tanstack/react-query'
import { characterStatsClient, statCardClient } from '../generated-api/api-clients'
import {
  ApiException,
  IStatCardDto,
  StatCardDto,
  StatDto,
} from '../generated-api/StatCardApi'

export const fetchCharacterStats: QueryFunction<
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

    if (!response) throw new Error('Error fetching character stats.')

    return response.toJSON()
  } catch (error: unknown) {
    if (error instanceof ApiException) {
      throw new Error(error.message)
    }
  }
}

export const createStatCard = async (newCard: StatCardDto) => {
  return await statCardClient.post(newCard)
}

export const getStatCard: QueryFunction<
  IStatCardDto,
  [
    string,
    {
      id?: number
    }
  ]
> = async ({ queryKey }) => {
  const [_key, { id }] = queryKey

  if (!id) return []

  return await (await statCardClient.get(id)).toJSON()
}

export const listStatCards = async () => {
  return (await statCardClient.getAll()).map((dto) => dto.toJSON())
}

export const deleteStatCard = async (cardId?: number) => {
  if (!cardId) return
  return await statCardClient.delete(cardId)
}

export const updateStatCard = async ({
  cardId,
  statCardDto,
}: {
  cardId?: number
  statCardDto?: StatCardDto
}) => {
  if (cardId === undefined || !statCardDto) return

  return await statCardClient.put(cardId, statCardDto)
}
