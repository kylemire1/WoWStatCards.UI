import { QueryFunction } from '@tanstack/react-query'
import { ApiResponse, StatCardDto } from 'lib/generated-api/StatCardApi'
import { StatDto } from 'lib/generated-api/custom-types'
import { http } from 'lib/http'
import { AxiosResponse } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

type MyQueryFunction<TReturnType, TArgs> = QueryFunction<
  TReturnType,
  [string, TArgs]
>

const getCharacterStats: MyQueryFunction<
  StatDto,
  {
    characterName: string
    realm: string
  }
> = async ({ queryKey: [_key, args] }) => {
  const { realm, characterName } = args
  if (!realm || !characterName || realm === '' || characterName === '')
    throw new Error('Missing arguments in character stat request')

  const result = await http.get<ApiResponse>(
    `/api/CharacterStats?characterName=${characterName}&realm=${realm}&clientId=${process.env.NEXT_PUBLIC_BLIZZ_CLIENT_ID}`
  )

  return result.data.result
}

const create = async (newCard: StatCardDto) => {
  if (!newCard.userEmail) {
    throw new Error('You must be logged in to save cards!')
  }

  try {
    const res = await http.post<StatCardDto, AxiosResponse<ApiResponse>>(
      '/api/StatCards',
      newCard
    )
    const data = res.data
    if (!data.isSuccess) {
      throw new Error(data.errorMessages.join(', '))
    }

    return data.result
  } catch (error) {
    throw new Error('Something went wrong while saving the stat card!')
  }
}

const get: MyQueryFunction<
  StatCardDto,
  {
    id?: number
  }
> = async ({ queryKey }) => {
  const [_key, { id }] = queryKey

  if (!id) throw new Error('Missing Id')

  try {
    const res = await http.get<ApiResponse>(`/api/StatCards/${id}`)
    const data = res.data

    if (!data.isSuccess) {
      throw new Error(data.errorMessages.join(', '))
    }

    return data.result
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Problem getting stat card')
  }
}

const getAll = async () => {
  try {
    const res = await http.get<ApiResponse>(`/api/StatCards`)
    const data = res.data
    if (!data.isSuccess) {
      throw new Error(data.errorMessages.join(', '))
    }

    return data.result
  } catch (error) {
    throw new Error('Problem getting all stat cards')
  }
}

const remove = async (cardId?: number) => {
  if (!cardId) throw new Error('Missing cardId')

  try {
    await http.delete(`/api/StatCards/${cardId}`)
  } catch (error) {
    console.log(error)
    throw error instanceof ApiError
      ? error
      : new Error('Problem getting all stat cards')
  }
}

const update = async ({
  cardId,
  statCardDto,
}: {
  cardId?: number
  statCardDto?: StatCardDto
}) => {
  if (cardId === undefined || !statCardDto)
    throw new Error('Missing arguments in update card request')

  try {
    const res = await http.put<StatCardDto, AxiosResponse<ApiResponse>>(
      `/api/StatCards/${cardId}`,
      statCardDto
    )

    const data = res.data
    if (!data.isSuccess) {
      throw new Error(data.errorMessages.join(', '))
    }

    return data.result
  } catch (error) {
    console.log(error)
    throw error instanceof Error
      ? error
      : new Error('Problem updating stat card')
  }
}

const StatCards = {
  queries: {
    get,
    getAll,
    getCharacterStats,
  },
  mutations: {
    create,
    update,
    remove,
  },
}

export default StatCards
