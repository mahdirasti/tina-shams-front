"use client";

type Props = {
  categories?: string;
};
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import PiecesItems from "../../components/items";

export default function PiecesPageItems({ categories }: Props) {
  const { dict } = useLocale();

  return (
    <PiecesItems title={dict.common.pieces_items} categories={categories} />
  );
}
