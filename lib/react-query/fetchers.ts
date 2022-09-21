import { QueryFunction } from "@tanstack/react-query";
import { API_BASE_URL } from "../constants";

const endpoints = {
  CharacterStats: `${API_BASE_URL}CharacterStats`,
};

export const fetchCharacterStats: QueryFunction<
  Record<string, number>,
  [
    string,
    {
      characterName: string;
      realm: string;
    }
  ]
> = async ({ queryKey }) => {
  const [_key, { characterName, realm }] = queryKey;
  return await fetch(
    `${endpoints.CharacterStats}?characterName=${characterName}&realm=${realm}&clientId=1f164e48ba3d47ac8f59fd6423b4bc7c`
  ).then((res) => res.json());
};
