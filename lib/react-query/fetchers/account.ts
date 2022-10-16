import { QueryFunction } from '@tanstack/react-query'
import { accountClient } from 'lib/generated-api/api-clients'
import { LoginDto } from 'lib/generated-api/StatCardApi'
import { UserDto } from 'lib/generated-api/types'
import { handleIfNotSuccess } from 'lib/utils'

const loginUser = async (credentials: LoginDto): Promise<UserDto> => {
  const response = await accountClient.login(credentials)

  handleIfNotSuccess(response)

  return response.result
}

const getCurrentUser: QueryFunction<UserDto> = async () => {
  const response = await accountClient.me()

  handleIfNotSuccess(response)

  return response.result
}

const fetchers = {
  queries: {
    getCurrentUser,
  },
  mutations: {
    loginUser,
  },
}

export default fetchers
