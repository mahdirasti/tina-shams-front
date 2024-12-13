import { TicketType } from "./ticket"
import { UserType } from "./user"

export type MessageType = {
  createdAt: string
  updatedAt: string
  ticket: string
  id: string
  owner: UserType
  text: string
}
