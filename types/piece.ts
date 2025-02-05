import { CategoryType } from "./category";
import { FileType } from "./file";

export type PieceType = {
  title: string;
  title_multi_lang: string;
  short_desc: string;
  purity: number;
  design_desc: string;
  slug: string;
  content: string;
  seo_title: string;
  seo_description: string;
  seo_keyword: string;
  thumbnail: FileType;
  mobile_thumbnail?: FileType;
  cover: FileType;
  mobile_cover?: FileType;
  categories: CategoryType[];
  createdAt: string;
  updatedAt: string;
  weight: string;
  id: string;
  similarProducts: PieceType[];
};
