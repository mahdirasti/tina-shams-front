"use client";

import {
  Sheet,
  SheetContent,
  SheetContentProps,
  SheetTitle,
} from "@/components/ui/sheet";
import { ReactNode, useState } from "react";

export type DrawerCustomProp = {
  trigger: (open: () => void) => ReactNode;
  children: (open: () => void, close: () => void) => ReactNode;
  config?: SheetContentProps;
  hasClose?: boolean;
};

export default function CSheet({
  trigger,
  children,
  config,
  hasClose = true,
}: DrawerCustomProp) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
      }}
      modal
    >
      {trigger(handleOpen)}
      <SheetContent
        hasClose={hasClose}
        {...config}
        className='h-full overflow-y-auto z-[1000]'
      >
        <SheetTitle hidden className='hidden' />
        {children(handleOpen, handleClose)}
      </SheetContent>
    </Sheet>
  );
}
