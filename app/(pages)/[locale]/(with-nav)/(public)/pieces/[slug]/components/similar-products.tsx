"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import Pieces from "@/components/shared/pieces/items";
import { PieceType } from "@/types/piece";

type Props = {
  similar_products: PieceType[];
  shop?: boolean;
};

export default function SimilarProducts({ similar_products, shop }: Props) {
  const { dict } = useLocale();

  return (
    <Pieces
      title={dict.common.similar_products}
      items={similar_products?.slice(0, 3)}
      shop={shop}
    />
  );
}
