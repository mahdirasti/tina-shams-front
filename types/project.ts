import { FileType } from "./file";

export type ProjectGalleryType = {
  media: FileType;
  type: string;
  _id: string;
};

export type ProjectType = {
  id: string;
  slug: string;
  content: string;
  cover: FileType;
  createdAt: string;
  gallery: ProjectGalleryType[];
  seo_description: string;
  seo_keyword: string;
  seo_title: string;
  title: string;
  updatedAt: string;
};
