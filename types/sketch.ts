import { FileType } from "./file";

export type SketchType = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover: FileType;
  createdAt: string;
  updatedAt: string;
  id: string;
};
