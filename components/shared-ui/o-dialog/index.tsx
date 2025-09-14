"use client";

import { cn } from "@/app/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useEffect, useState } from "react";

type BaseDialogProps = {
  children: (close: () => void) => ReactNode;
  onClose?: () => void;
  dialogContentCss?: string;
  isGravity?: boolean;
  goneOnDesktop?: boolean;
};

interface DialogWithDefaultOpen extends BaseDialogProps {
  isDefaultOpen: boolean;
  trigger?: any;
}

interface DialogWithTrigger extends BaseDialogProps {
  isDefaultOpen?: any;
  trigger: (open: () => void) => ReactNode;
}

// export type ODialogProps = DialogWithDefaultOpen | DialogWithTrigger
export type ODialogProps = {
  children: (close: () => void) => ReactNode;
  onClose?: () => void;
  dialogContentCss?: string;
  isGravity?: boolean;
  goneOnDesktop?: boolean;
} & (
  | { isDefaultOpen: boolean; trigger?: any }
  | { isDefaultOpen?: any; trigger: (open: () => void) => ReactNode }
);

const DESKTOP_SCREEN_SIZE = 768;

export default function ODialog({
  trigger,
  children,
  onClose,
  isGravity = false,
  dialogContentCss,
  isDefaultOpen,
  goneOnDesktop = false,
}: ODialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  let defaultClss = "";
  let wideClss =
    "md:!top-[50%] md:!left-[50%] md:!translate-x-[-50%] md:!translate-y-[-50%] md:!h-auto max-w-[initial] md:!rounded-2xl";
  if (isGravity) {
    defaultClss =
      " translate-x-0 translate-y-0 w-full rounded-tl-2xl !rounded-bl-none !rounded-br-none bottom-0 right-0 left-0  md:right-auto md:bottom-auto rounded-tr-2xl";
  }

  let contentClss = cn(defaultClss, wideClss);

  if (dialogContentCss) contentClss = cn(contentClss, dialogContentCss);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (goneOnDesktop === false) return;

    const fn = () => {
      if (window.innerWidth > DESKTOP_SCREEN_SIZE) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", fn);

    return () => {
      window.removeEventListener("resize", fn);
    };
  }, [goneOnDesktop]);

  useEffect(() => {
    if (isDefaultOpen) {
      setIsOpen(true);
    }
  }, [isDefaultOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open === false && onClose) onClose();
      }}
    >
      {!!trigger && (
        <DialogTrigger asChild>{trigger(handleOpen)}</DialogTrigger>
      )}
      <DialogContent className={contentClss}>
        <DialogTitle hidden className='hidden' />
        {children(handleClose)}
      </DialogContent>
    </Dialog>
  );
}
