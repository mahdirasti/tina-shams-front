import { UserType } from "./user";

export enum TicketStatus {
  AwaitingAdminReply = 1,
  UserReplied = 2,
  Replied = 3,
  Closed = 4,
}

export type TicketType = {
  createdAt: string;
  description: string;
  id: string;
  owner: UserType;
  status: number;
  subject: string;
  updatedAt: string;
};
