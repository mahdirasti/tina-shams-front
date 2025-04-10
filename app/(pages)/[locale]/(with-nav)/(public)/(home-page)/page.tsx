import React from "react";
import Intro from "./components/intro";
import Radiance from "./components/radiance";
import { OSpace } from "@/components/shared-ui";
import { LocaleType } from "@/types/locale";
import { PieceType } from "@/types/piece";
import Banners from "./components/banners";
import HomePieces from "./components/pieces";
import axiosInstance, { setDefaultLocale } from "@/app/lib/axios";
import { SliderType } from "@/types/slider";
import { getFullAssets, getLinkWithLocale } from "@/app/lib/utils";
import BlurFade from "@/components/ui/blur-fade";
import { Metadata } from "next";
import { getDictionary } from "@/app/(pages)/[locale]/dictionaries";

async function getHome() {
  return axiosInstance.get(`/home`);
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}): Promise<Metadata> => {
  const { locale } = await params;

  const dict = await getDictionary(locale);

  return {
    title: dict.common.home_page,
  };
};

type Props = {
  params: {
    locale: LocaleType;
  };
};

export default async function HomePage({ params: { locale } }: Props) {
  setDefaultLocale(locale);

  const home = await getHome();

  const products: PieceType[] = home?.data?.data?.products ?? [];
  const sliders: SliderType[] = home?.data?.data?.sliders ?? [];

  return (
    <BlurFade inView yOffset={0}>
      <Intro />
      <OSpace height={64} />
      <Radiance />
      <OSpace height={64} />
      <HomePieces items={products} />
      <OSpace height={64} />
      <Banners
        items={sliders.map((item) => ({
          background: item.cover ? getFullAssets(item.cover.fileName) : "",
          desc: item.desc,
          title: item.title,
          link: getLinkWithLocale(item.link, locale),
        }))}
      />
    </BlurFade>
  );
}
