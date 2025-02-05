import { cn, getFullAssets } from "@/app/lib/utils";
import { PieceType } from "@/types/piece";
import Image from "next/image";

type Props = {
  piece: PieceType;
};

export default function SinglePieceCover({ piece }: Props) {
  return (
    <>
      {piece?.cover && (
        <img
          src={getFullAssets(piece.cover.fileName)}
          alt=''
          className={cn(
            "object-cover object-center md:absolute md:top-0 md:left-0 md:right-0 md:bottom-0 mb-4 md:mb-0 w-full",
            piece.mobile_cover ? "hidden md:block" : ""
          )}
        />
      )}
      {piece?.mobile_cover && (
        <img
          src={getFullAssets(piece.mobile_cover.fileName)}
          alt=''
          className='object-cover object-center md:hidden md:absolute md:top-0 md:left-0 md:right-0 md:bottom-0 mb-4 md:mb-0 w-full'
        />
      )}
    </>
  );
}
