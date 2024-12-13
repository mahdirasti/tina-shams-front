import { UserType } from "./user"

export type AuthenticateType = {
  tokens: {
    refreshToken: string
    accessToken: string
  }
  user: UserType
  permissions: string[]
}
