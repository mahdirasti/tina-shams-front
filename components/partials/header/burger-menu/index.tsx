import { cn } from "@/app/lib/utils";
import { OrgIconButton } from "@/components/shared-ui";
import { EllipsisVertical, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { headerMenuItems } from "..";
import BurgerMenuLink from "./link";
import BlurFade from "@/components/ui/blur-fade";
import { usePathname } from "next/navigation";

export default function BurgerMenu() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <OrgIconButton
        className={`bg-transparent relative ${open ? "z-20" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X /> : <EllipsisVertical />}
      </OrgIconButton>
      <div
        className={cn(
          `fixed top-0 left-0 w-screen h-screen bg-black/50 !backdrop-blur-md transition-all z-10`,
          open ? "opacity-100 visible" : "invisible opacity-0"
        )}
      >
        <div
          className={cn(
            "h-auto top-0 left-0 bg-background fixed transition-all w-screen flex flex-col items-center justify-center",
            !open ? "translate-y-[-100%]" : "translate-y-0"
          )}
        >
          <div className='flex flex-col gap-y-4 pt-20 pb-4 px-6 items-center w-full'>
            {headerMenuItems.map((item, key) => (
              <BlurFade key={key} inView delay={0.3 * (1 + key)}>
                <BurgerMenuLink link={item.href} title={item.title} />
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
