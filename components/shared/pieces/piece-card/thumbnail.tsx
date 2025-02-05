import { cn, getFullAssets } from "@/app/lib/utils";
import { PieceType } from "@/types/piece";
import Image from "next/image";

type Props = {
  piece: PieceType;
};

export default function PieceThumbnail({ piece }: Props) {
  return (
    <>
      {!!piece.thumbnail && (
        <Image
          fill
          src={getFullAssets(piece.thumbnail.fileName)}
          alt=''
          className={cn(
            "object-cover object-center",
            piece.mobile_thumbnail ? "hidden md:block" : ""
          )}
        />
      )}
      {!!piece.mobile_thumbnail && (
        <Image
          fill
          src={getFullAssets(piece.mobile_thumbnail.fileName)}
          alt=''
          className='object-cover object-center md:hidden'
        />
      )}
    </>
  );
}
