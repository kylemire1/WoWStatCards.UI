import { AxiosResponse } from 'axios'
import { ApiResponse, StatCardDto } from 'lib/generated-api/StatCardApi'
import { http } from '../../http'

export const characterStatsFetcher = async ({
  characterName,
  realm,
}: {
  characterName?: string
  realm?: string
}): Promise<ApiResponse> => {
  if (!realm || !characterName || realm === '' || characterName === '')
    throw new Error('Missing arguments in character stat request')

  const result = await http.get<ApiResponse>(
    `/api/CharacterStats?characterName=${characterName}&realm=${realm}&clientId=${process.env.NEXT_PUBLIC_BLIZZ_CLIENT_ID}`
  )

  return result.data
}

export const statCardCreator = async ({ newCard }: { newCard: StatCardDto }) => {
  const result = await http.post<StatCardDto, AxiosResponse<ApiResponse>>(
    '/api/StatCards',
    newCard
  )
  return result.data
}
