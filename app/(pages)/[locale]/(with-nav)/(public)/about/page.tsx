import React from "react";
import Intro from "./components/intro";
import Details from "./components/details";
import { PieceType } from "@/types/piece";
import AboutPieces from "./components/pieces";
import { OSpace } from "@/components/shared-ui";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { LocaleType } from "@/types/locale";

const getPieces = () => {
  return axiosInstance.get(`/products`);
};

type Props = {
  params: {
    locale: LocaleType;
  };
};

export default async function AboutPage({ params: { locale } }: Props) {
  setDefaultLocale(locale);

  const productsRes = await getPieces();

  const products: PieceType[] = productsRes?.data?.data?.items ?? [];

  return (
    <div>
      <Intro />
      <Details />
      <OSpace height={80} />
      <AboutPieces items={products} />
    </div>
  );
}
