import { AccountClient, CharacterStatsClient, StatCardsClient } from './StatCardApi'
import fetch from 'isomorphic-fetch'
import { RequestInit } from 'next/dist/server/web/spec-extension/request'

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const ssrSafeFetch = (url: RequestInfo, init?: RequestInit | undefined) => {
  return fetch(url, { ...init, credentials: 'include' })
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
