import { MainContainer } from "@/components/containers";
import React from "react";
import Slider from "./components/slider";
import PiecesItems from "./components/items";
import { OSpace } from "@/components/shared-ui";
import PiecesBanners from "./components/banner";
import { LocaleType } from "@/types/locale";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { PieceType } from "@/types/piece";
import { SliderType } from "@/types/slider";
import { CategoryType } from "@/types/category";
import CategoryChips from "./components/chips";
import { urlWithQueryParams } from "@/app/lib/utils";
import BlurFade from "@/components/ui/blur-fade";

type Props = {
  params: {
    locale: LocaleType;
  };
  searchParams: {
    categories: string;
  };
};

const getPieces = (categories?: string) => {
  const filterQuery: { [key: string]: string } = {};

  if (categories) filterQuery["categories"] = categories;

  return axiosInstance.get(urlWithQueryParams(`/products`, filterQuery));
};

const getPiecesSliders = () => {
  return axiosInstance.get(`/slider/search`);
};

const getCategories = () => {
  return axiosInstance.get(`/category`);
};

export default async function PiecesPage({
  params: { locale },
  searchParams,
}: Props) {
  setDefaultLocale(locale);

  // const productsRes = await getPieces(searchParams.categories);
  const sliderRes = await getPiecesSliders();
  const categoryRes = await getCategories();

  // const products: PieceType[] = productsRes?.data?.data?.items ?? [];
  const sliders: SliderType[] = sliderRes?.data?.data ?? [];
  const categories: CategoryType[] = categoryRes?.data?.data?.items ?? [];

  return (
    <BlurFade inView className='mt-16 md:mt-24'>
      <MainContainer>
        <Slider items={sliders.filter((a) => a.location === "home")} />
        <OSpace height={80} />
        <CategoryChips items={categories} />
        <OSpace height={80} />
        <PiecesItems categories={searchParams.categories} />
        <OSpace height={80} />
        <PiecesBanners items={sliders.filter((a) => a.location === "pieces")} />
      </MainContainer>
    </BlurFade>
  );
}
