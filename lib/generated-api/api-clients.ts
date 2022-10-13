import { LS_KEY_NAME } from "lib/constants";
import {
  AccountClient,
  CharacterStatsClient,
  StatCardsClient,
} from "./StatCardApi";
import fetch from "isomorphic-fetch";
import { canUseDom, getLocalStorage } from "lib/utils";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import cookie from "cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = () => getLocalStorage(LS_KEY_NAME);

const ssrSafeFetch = (url: RequestInfo, init?: RequestInit | undefined) => {
  const token = getToken();

  const headers = new Headers(init?.headers);
  if (token !== undefined) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return fetch(url, { ...init, headers });
};

export const characterStatsClient = new CharacterStatsClient(API_URL, {
  fetch: ssrSafeFetch,
});
export const statCardClient = new StatCardsClient(API_URL, {
  fetch: ssrSafeFetch,
});
export const accountClient = new AccountClient(API_URL, {
  fetch: ssrSafeFetch,
});
