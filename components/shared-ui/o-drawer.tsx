import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ReactNode, useState } from "react";

export type DrawerCustomProp = {
  trigger: (open: () => void) => ReactNode;
  children: (open: () => void, close: () => void) => ReactNode;
};

export default function CDrawer({ trigger, children }: DrawerCustomProp) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
      }}
    >
      {trigger(handleOpen)}
      <DrawerContent>{children(handleOpen, handleClose)}</DrawerContent>
    </Drawer>
  );
}
