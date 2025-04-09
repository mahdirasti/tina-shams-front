import { FileType } from "./file";
import { UserType } from "./user";

export enum PageStatus {
  "Published" = 1,
  "Draft" = 2,
}

export type PageType = {
  author: UserType;
  content: string;
  createdAt: string;
  id: string;
  seo_description: string;
  seo_keyword: string;
  seo_title: string;
  slug: string;
  status: PageStatus;
  title: string;
  updatedAt: string;
};
