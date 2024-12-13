import { ProductType } from "./product"
import { UserType } from "./user"

export type CommentType = {
  author: UserType
  children: CommentType[]
  createdAt: string
  description: string
  id: string
  likers: any[]
  likes: number
  rate: number
  updatedAt: string
}
