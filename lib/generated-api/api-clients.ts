import { API_BASE_URL } from "../constants";
import { CharacterStatsClient, StatCardsClient } from "./StatCardApi";
import fetch from "isomorphic-fetch";

export const characterStatsClient = new CharacterStatsClient(API_BASE_URL, {
  fetch,
});
export const statCardClient = new StatCardsClient(API_BASE_URL, { fetch });
