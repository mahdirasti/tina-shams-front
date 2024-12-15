import React from "react";
import Intro from "./components/intro";
import Radiance from "./components/radiance";
import { OSpace } from "@/components/shared-ui";
import { LocaleType } from "@/types/locale";
import { PieceType } from "@/types/piece";
import Banners from "./components/banners";
import HomePieces from "./components/pieces";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";

async function getHome() {
  return axiosInstance.get(`/home`);
}

type Props = {
  params: {
    locale: LocaleType;
  };
};

export default async function HomePage({ params: { locale } }: Props) {
  setDefaultLocale(locale);

  const home = await getHome();

  const products: PieceType[] = home?.data?.data?.products ?? [];

  return (
    <>
      <Intro />
      <OSpace height={64} />
      <Radiance />
      <OSpace height={64} />
      <HomePieces items={products} />
      <OSpace height={64} />
      <Banners
        items={[
          {
            background: `/assets/images/banner-1.jpg`,
            desc: 'The "Mad Love ring is a bold statement piece \n — combining elegance and charm.',
            title: "Mad Love",
          },
          {
            background: `/assets/images/banner-2.jpg`,
            desc: "Introducing The Time Collection \n — a splendid fusion of artistry and precision",
            title: "The Time",
          },
        ]}
      />
    </>
  );
}
