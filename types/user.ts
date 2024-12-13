import { RoleType } from "./role"

export type UserType = {
  mobile: string
  name: string
  surename: string
  roles: RoleType[]
  createdAt: string
  email?: string
  updatedAt: string
  id: string
}
