"use client";

import { cn } from "@/app/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { ODialogProps } from ".";

export default function OCustomDialog({
  children,
  isGravity = false,
  dialogContentCss,
  open,
  onOpenChange,
}: Omit<ODialogProps, "children"> & {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  children: ReactNode;
}) {
  let defaultClss = "";
  let wideClss =
    "md:!top-[50%] md:!left-[50%] md:!translate-x-[-50%] md:!translate-y-[-50%] md:!h-auto max-w-[initial] md:!rounded-2xl";
  if (isGravity) {
    defaultClss =
      " translate-x-0 translate-y-0 w-full rounded-tl-2xl !rounded-bl-none !rounded-br-none bottom-0 right-0 left-0  md:right-auto md:bottom-auto rounded-tr-2xl";
  }

  let contentClss = cn(defaultClss, wideClss);

  if (dialogContentCss) contentClss = cn(contentClss, dialogContentCss);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={contentClss}>{children}</DialogContent>
    </Dialog>
  );
}
