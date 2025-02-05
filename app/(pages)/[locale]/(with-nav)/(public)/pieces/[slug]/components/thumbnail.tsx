import { cn, getFullAssets } from "@/app/lib/utils";
import { PieceType } from "@/types/piece";
import Image from "next/image";

type Props = {
  piece: PieceType;
};

export default function SinglePieceThumbnail({ piece }: Props) {
  return (
    <>
      {piece?.thumbnail && (
        <Image
          src={getFullAssets(piece.thumbnail.fileName)}
          alt=''
          className={cn(
            "object-cover object-center",
            piece.mobile_thumbnail ? "hidden md:block" : ""
          )}
          fill
        />
      )}
      {piece?.mobile_thumbnail && (
        <Image
          src={getFullAssets(piece.mobile_thumbnail.fileName)}
          alt=''
          className='object-cover object-center md:hidden'
          fill
        />
      )}
    </>
  );
}
