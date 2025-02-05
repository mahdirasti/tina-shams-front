"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import Pieces from "@/components/shared/pieces/items";
import { useAppSelector } from "@/redux/store";

export default function RecentProductViews() {
  const { dict } = useLocale();

  const recent_view_pieces = useAppSelector(
    (store) => store.general.recent_pieces
  );

  return (
    <Pieces
      title={dict.common.recent_piece_views}
      items={[...recent_view_pieces].reverse()}
    />
  );
}
