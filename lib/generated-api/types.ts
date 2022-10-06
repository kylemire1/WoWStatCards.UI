import { CharacterStats, FactionEnum } from "./StatCardApi";

export interface StatDto extends CharacterStats {
  avatarUrl: string;
  renderUrl: string;
  factionId: FactionEnum;
}
