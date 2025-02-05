import { FileType } from "./file";
import { UserType } from "./user";

export enum BlogStatus {
  "Published" = 1,
  "Draft" = 2,
}

export type BlogType = {
  author: UserType;
  content: string;
  createdAt: string;
  id: string;
  seo_description: string;
  seo_keyword: string;
  seo_title: string;
  slug: string;
  status: BlogStatus;
  thumbnail?: FileType;
  title: string;
  updatedAt: string;
  excerpt?: string;
};
