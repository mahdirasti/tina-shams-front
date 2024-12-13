import React from "react";
import Intro from "./components/intro";

async function getHome() {
  // return axiosInstance.get(`/home`);
}

export default async function HomePage() {
  const home = await getHome();

  return (
    <>
      <Intro />
    </>
  );
}
