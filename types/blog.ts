import { FileType } from "./file";

export enum BlogStatus {
  "Published" = 1,
  "Draft" = 2,
}

export type BlogType = {
  title: string;
  content: string;
  seo_title: string;
  seo_keyword: string;
  slug: string;
  thumbnail: FileType;
  author: string;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
  seo_description: string;
  id: string;
};
