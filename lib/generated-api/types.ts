import { CharacterStats, FactionEnum } from './StatCardApi'

export interface StatDto extends CharacterStats {
  avatarUrl: string
  renderUrl: string
  factionId: FactionEnum
}

export interface UserDto {
  displayName: string
  userName: string
  token: string
}
