import SmallContainer from "@/components/containers/small-container";
import Pieces from "@/components/shared/pieces/items";
import { PieceType } from "@/types/piece";
import React from "react";

export default function HomePieces({ items }: { items: PieceType[] }) {
  return (
    <SmallContainer>
      <Pieces items={items} />
    </SmallContainer>
  );
}
