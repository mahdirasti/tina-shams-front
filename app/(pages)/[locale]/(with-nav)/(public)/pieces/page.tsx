import { MainContainer } from "@/components/containers";
import React from "react";
import Slider from "./components/slider";
import { OSpace } from "@/components/shared-ui";
import PiecesBanners from "./components/banner";
import { LocaleType } from "@/types/locale";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { SliderType } from "@/types/slider";
import { CategoryType } from "@/types/category";
import CategoryChips from "./components/chips";
import BlurFade from "@/components/ui/blur-fade";
import PiecesPageItems from "./[slug]/components/items";
import { getDictionary } from "../../../dictionaries";
import { getCanonicalURL } from "@/app/actions/canonical";
import { Metadata } from "next";
type Props = {
  params: {
    locale: LocaleType;
  };
  searchParams: {
    categories: string;
  };
};

const getPiecesSliders = () => {
  return axiosInstance.get(`/slider/search`);
};

const getCategories = () => {
  return axiosInstance.get(`/category`);
};

export const generateMetadata = async (): Promise<Metadata> => {
  const dict = await getDictionary("fa");
  const canonical = await getCanonicalURL();
  return {
    title: dict.common.pieces,
    description: dict.common.pieces_description,
    openGraph: {
      title: dict.common.pieces,
      description: dict.common.blog_description,
    },
    alternates: {
      canonical: canonical,
      languages: {
        en: process.env.NEXT_PUBLIC_BASE_URL + "/en",
        fa: process.env.NEXT_PUBLIC_BASE_URL + "/fa",
        ar: process.env.NEXT_PUBLIC_BASE_URL + "/ar",
      },
    },
  };
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
        <PiecesPageItems categories={searchParams.categories} />
        <OSpace height={80} />
        <PiecesBanners items={sliders.filter((a) => a.location === "pieces")} />
      </MainContainer>
    </BlurFade>
  );
}
