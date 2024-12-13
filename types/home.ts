import { BlogType } from "./blog";
import { CategoryType } from "./category";

export type HomeType = {
  sliders: [];
  discountProducts: [];
  latestProducts: [];
  latestFeaturedProducts: [];
  brands: [];
  categories: CategoryType[];
  middleBanners: [];
  blogs: BlogType[];
};

export type BlogHomeType = {
  blogs: BlogType[];
  categories: CategoryType[];
};
