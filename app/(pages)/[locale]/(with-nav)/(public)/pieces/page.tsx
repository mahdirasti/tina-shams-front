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

type Props = {
  params: {
    locale: LocaleType;
  };
};

const getPieces = () => {
  return axiosInstance.get(`/products`);
};

const getPiecesSliders = () => {
  return axiosInstance.get(`/slider/search`);
};

export default async function PiecesPage({ params: { locale } }: Props) {
  setDefaultLocale(locale);

  const productsRes = await getPieces();
  const sliderRes = await getPiecesSliders();

  const products: PieceType[] = productsRes?.data?.data?.items ?? [];
  const sliders: SliderType[] = sliderRes?.data?.data ?? [];

  return (
    <div className='md:mt-24'>
      <MainContainer>
        <Slider items={sliders.filter((a) => a.location === "home")} />
        <OSpace height={80} />
        <PiecesItems items={products} />
        <OSpace height={80} />
        <PiecesBanners items={sliders.filter((a) => a.location === "pieces")} />
      </MainContainer>
    </div>
  );
}
