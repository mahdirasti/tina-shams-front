import { MainContainer } from "@/components/containers";
import React from "react";
import Slider from "./components/slider";
import PiecesItems from "./components/items";
import { OSpace } from "@/components/shared-ui";
import PiecesBanners from "./components/banner";
import { LocaleType } from "@/types/locale";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { PieceType } from "@/types/piece";

type Props = {
  params: {
    locale: LocaleType;
  };
};

const getPieces = () => {
  return axiosInstance.get(`/products`);
};

export default async function PiecesPage({ params: { locale } }: Props) {
  setDefaultLocale(locale);

  const home = await getPieces();

  const products: PieceType[] = home?.data?.data?.items ?? [];

  return (
    <div className='md:mt-24'>
      <MainContainer>
        <Slider />
        <OSpace height={80} />
        <PiecesItems items={products} />
        <OSpace height={80} />
        <PiecesBanners />
      </MainContainer>
    </div>
  );
}
