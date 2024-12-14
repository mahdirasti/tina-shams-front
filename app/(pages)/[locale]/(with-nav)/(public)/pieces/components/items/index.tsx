import { OSpace } from "@/components/shared-ui";
import Pieces from "@/components/shared/pieces/items";
import { PieceType } from "@/types/piece";
import ExpandAll from "./exapnd-all";

type Props = {
  title: string;
  items: PieceType[];
};

export default function PiecesItems({ title, items }: Props) {
  return (
    <>
      <Pieces items={items} title={title} />
      <OSpace height={24} />
      <ExpandAll />
    </>
  );
}
