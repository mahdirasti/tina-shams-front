"use client"

import { cn } from "@/app/lib/utils"
import ODialog, { ODialogProps } from "."

export default function OFullDialog({
  dialogContentCss,
  ...rest
}: ODialogProps) {
  let fullClss =
    "!top-0 !left-0 translate-x-[0] translate-y-[0]  h-full max-w-[initial] !rounded-none p-0"
  if (dialogContentCss) fullClss = cn(fullClss, dialogContentCss)
  return <ODialog {...rest} dialogContentCss={fullClss} />
}
