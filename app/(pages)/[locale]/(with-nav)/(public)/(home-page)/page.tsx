import React from "react";
import Intro from "./components/intro";
import Radiance from "./components/radiance";
import { OSpace } from "@/components/shared-ui";
import { LocaleType } from "@/types/locale";
import { getDictionary } from "../../../dictionaries";
import Pieces from "./components/pieces";
import { PieceType } from "@/types/piece";

async function getHome() {
  // return axiosInstance.get(`/home`);
}

type Props = {
  params: {
    locale: LocaleType;
  };
};

const MOCK_PIECES: PieceType[] = [
  {
    source: "/assets/images/piece-1.jpg",
    title: "Shark Ring",
    category: "Ring",
    desc: "The Shark Ring is a masterful blend of motion and power.",
    link: "/pieces/shark-ring",
  },
  {
    source: "/assets/images/piece-2.jpg",
    title: "Mad Love",
    category: "Ring",
    desc: "The “Mad Love” ring is a bold statement piece, blending elegance and charm effortlessly. ",
    link: "/pieces/mad-love",
  },
  {
    source: "/assets/images/piece-3.jpg",
    title: "Papillon",
    category: "Ear Ring",
    desc: "Elegance tied in knots, not wings. It's called 'Nodo,' not your usual Papillon, babes..",
    link: "/pieces/papillon",
  },
];

export default async function HomePage({ params: { locale } }: Props) {
  const home = await getHome();

  return (
    <>
      <Intro />
      <OSpace height={64} />
      <Radiance />
      <OSpace height={64} />
      <Pieces items={MOCK_PIECES} />
    </>
  );
}
