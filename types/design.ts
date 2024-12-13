import { FileType } from "./file";

export type DesignType = {
  id: string;
  slug: string;
  cover: FileType;
  createdAt: string;
  gallery: DesignGalleryItemType[];
  seo_description: string;
  seo_keyword: string;
  seo_title: string;
  short_description: string;
  title: string;
  updatedAt: string;
};

export type DesignGalleryItemType = {
  big_title: string;
  description: string;
  media: FileType;
  title: string;
  _id: string;
};
