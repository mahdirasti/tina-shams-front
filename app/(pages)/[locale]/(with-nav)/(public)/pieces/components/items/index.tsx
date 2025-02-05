"use client";

import { OSpace } from "@/components/shared-ui";
import Pieces from "@/components/shared/pieces/items";
import { PieceType } from "@/types/piece";
import PaginationMaker from "@/components/shared/pagination-maker";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

type Props = {
  title?: string;
  categories?: string;
};

export default function PiecesItems({ title, categories }: Props) {
  const { dict } = useLocale();

  return (
    <>
      <PaginationMaker<PieceType>
        endpoint={`/products`}
        queries={{ categories }}
        showMoreText={dict.common.show_more}
      >
        {(items) => {
          if (items.length === 0) return null;

          return (
            <>
              <Pieces items={items} title={title} />
              <OSpace height={24} />
            </>
          );
        }}
      </PaginationMaker>

      {/* <ExpandAll /> */}
    </>
  );
}
