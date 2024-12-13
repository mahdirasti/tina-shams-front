import { FileType } from "./file";

export type HomeSliderType = {
  id: string;
  name: string;
  link: string;
  button_text: string;
  createdAt: string;
  udpatedAt: string;
  isActive: boolean;
  desktop: FileType;
  mobile: FileType;
};
