import { UserType } from "./user"

export type AddressType = {
  address: string
  createdAt: string
  id: string
  lat: number
  lng: number
  loc_number: string
  name: string
  tel: string
  unit: string
  updatedAt: string
  user: UserType
}
