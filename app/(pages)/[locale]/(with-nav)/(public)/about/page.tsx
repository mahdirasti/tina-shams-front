import React from "react";
import Intro from "./components/intro";
import Details from "./components/details";
import { PieceType } from "@/types/piece";
import AboutPieces from "./components/pieces";
import { OSpace } from "@/components/shared-ui";

const MOCK_PIECES: PieceType[] = [
  {
    slug: "shark-ring",
    source: "/assets/images/piece-1.jpg",
    title: "Shark Ring",
    category: "Ring",
    desc: "The Shark Ring is a masterful blend of motion and power.",
    link: "/pieces/shark-ring",
  },
  {
    slug: "mad-love",
    source: "/assets/images/piece-2.jpg",
    title: "Mad Love",
    category: "Ring",
    desc: "The “Mad Love” ring is a bold statement piece, blending elegance and charm effortlessly. ",
    link: "/pieces/mad-love",
  },
  {
    slug: "papillon",
    source: "/assets/images/piece-3.jpg",
    title: "Papillon",
    category: "Ear Ring",
    desc: "Elegance tied in knots, not wings. It's called 'Nodo,' not your usual Papillon, babes..",
    link: "/pieces/papillon",
  },
];

export default function AboutPage() {
  return (
    <div>
      <Intro />
      <Details />
      <OSpace height={80} />
      <AboutPieces items={MOCK_PIECES} />
    </div>
  );
}
