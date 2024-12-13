import React from "react";
import Intro from "./components/intro";
import Radiance from "./components/radiance";
import { OSpace } from "@/components/shared-ui";
import { LocaleType } from "@/types/locale";
import { getDictionary } from "../../../dictionaries";

async function getHome() {
  // return axiosInstance.get(`/home`);
}

type Props = {
  params: {
    locale: LocaleType;
  };
};

export default async function HomePage({ params: { locale } }: Props) {
  const home = await getHome();

  return (
    <>
      <Intro />
      <OSpace height={64} />
      <Radiance />
      <OSpace height={64} />
    </>
  );
}
