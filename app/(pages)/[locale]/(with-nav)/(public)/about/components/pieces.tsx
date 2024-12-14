import { MainContainer } from "@/components/containers";
import Pieces from "@/components/shared/pieces/items";
import { PieceType } from "@/types/piece";
import React from "react";

type Props = {
  items: PieceType[];
};
export default function AboutPieces({ items = [] }: Props) {
  return (
    <MainContainer>
      <Pieces items={items} />
    </MainContainer>
  );
}
