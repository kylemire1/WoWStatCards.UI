import { AccountClient, CharacterStatsClient, StatCardsClient } from './StatCardApi'
import fetch from 'isomorphic-fetch'

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const characterStatsClient = new CharacterStatsClient(API_URL, {
  fetch,
})
export const statCardClient = new StatCardsClient(API_URL, {
  fetch,
})
export const accountClient = new AccountClient(API_URL, {
  fetch,
})
