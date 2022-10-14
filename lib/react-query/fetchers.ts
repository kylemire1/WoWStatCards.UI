import { QueryFunction } from '@tanstack/react-query'
import { characterStatsClient, statCardClient } from '../generated-api/api-clients'
import { ApiException, ApiResponse, StatCardDto } from '../generated-api/StatCardApi'
import { StatDto } from '../generated-api/types'

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

    handleIfNotSuccess(response)

    return response.result
  } catch (error: unknown) {
    if (error instanceof ApiException) {
      throw new Error(error.message)
    }
  }
}

export const createStatCard = async (newCard: StatCardDto) => {
  const response = await statCardClient.create(newCard)

  handleIfNotSuccess(response)

  return response.result
}

export const getStatCard: QueryFunction<
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

export const listStatCards = async () => {
  const response = await statCardClient.getAll()

  handleIfNotSuccess(response)

  return response.result
}

export const deleteStatCard = async (cardId?: number) => {
  if (!cardId) return

  const response = await statCardClient.delete(cardId)

  handleIfNotSuccess(response)
}

export const updateStatCard = async ({
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

export const handleIfNotSuccess = (response: ApiResponse) => {
  if (!response.isSuccess) throw new Error(response.errorMessages.join('\\n'))
}
