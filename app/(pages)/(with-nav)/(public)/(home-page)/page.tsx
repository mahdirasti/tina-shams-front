import React from "react";
import Intro from "./components/intro";
import Radiance from "./components/radiance";
import { OSpace } from "@/components/shared-ui";

async function getHome() {
  // return axiosInstance.get(`/home`);
}

export default async function HomePage() {
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
