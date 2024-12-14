import { MainContainer } from "@/components/containers";
import React from "react";
import Slider from "./components/slider";
import PiecesItems from "./components/items";
import { PieceType } from "@/types/piece";
import { OSpace } from "@/components/shared-ui";
import PiecesBanners from "./components/banner";

import mockProducts from "./data/mock.json";

const MOCK_PIECES: PieceType[] = mockProducts;

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
