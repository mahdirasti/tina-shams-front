"use client";

import { addPiece } from "@/redux/slices/general-slice";
import { useAppDispatch } from "@/redux/store";
import { PieceType } from "@/types/piece";
import { useEffect } from "react";

type Props = {
  piece: PieceType;
};

export default function PieceClientActions({ piece }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addPiece(piece));
  }, []);

  return null;
}
