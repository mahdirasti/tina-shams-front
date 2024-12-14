import { MainContainer } from "@/components/containers";
import React from "react";
import Slider from "./components/slider";
import PiecesItems from "./components/items";
import { PieceType } from "@/types/piece";
import { OSpace } from "@/components/shared-ui";
import PiecesBanners from "./components/banner";

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
  {
    slug: "shark-ring",
    source: "/assets/images/piece-5.jpg",
    title: "Shark Ring",
    category: "Ring",
    desc: "The Shark Ring is a masterful blend of motion and power.",
    link: "/pieces/shark-ring",
  },
  {
    slug: "mad-love",
    source: "/assets/images/radience-bg-mobile.jpg",
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

export default function PiecesPage() {
  return (
    <div className='md:mt-24'>
      <MainContainer>
        <Slider />
        <OSpace height={80} />
        <PiecesItems items={MOCK_PIECES} title='Cocktail Rings' />
        <OSpace height={80} />
        <PiecesBanners />
      </MainContainer>
    </div>
  );
}
