import { FileType } from "./file";

export type SliderType = {
  id: string;
  title: string;
  desc: string;
  location: string;
  link: string;
  button_text: string;
  createdAt: string;
  udpatedAt: string;
  isActive: boolean;
  cover: FileType;
};
