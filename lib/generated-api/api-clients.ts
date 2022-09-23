import { API_BASE_URL } from "../constants";
import { CharacterStatsClient, StatCardsClient } from "./StatCardApi";

export const characterStatsClient = new CharacterStatsClient(API_BASE_URL);
export const statCardClient = new StatCardsClient(API_BASE_URL);
