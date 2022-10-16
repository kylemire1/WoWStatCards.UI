import { AccountClient, CharacterStatsClient, StatCardsClient } from './StatCardApi'
import fetch from 'isomorphic-fetch'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'
import cookie from 'cookie'
import { KEY_NAME } from 'lib/constants'

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const ssrSafeFetch = (url: RequestInfo, init?: RequestInit | undefined) => {
  const headers = new Headers(init?.headers)

  const cookies = cookie.parse(document.cookie, {})
  const token = cookies[KEY_NAME] ?? undefined

  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }

  return fetch(url, { ...init, headers, credentials: 'include' })
}

export const characterStatsClient = new CharacterStatsClient(API_URL, {
  fetch: ssrSafeFetch,
})
export const statCardClient = new StatCardsClient(API_URL, {
  fetch: ssrSafeFetch,
})
export const accountClient = new AccountClient(API_URL, {
  fetch: ssrSafeFetch,
})
