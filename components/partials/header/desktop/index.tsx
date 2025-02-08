import Logo from "@/components/shared/logo";
import React from "react";
import LanguageSwitcher from "../language-switcher";
import DesktopHeaderMenu from "./menu";
import { usePage } from "@/app/hooks/use-page";
import GoldShower from "../gold-shower";
import { cn } from "@/app/lib/utils";

type Props = {
  scrolled: boolean;
};

export default function DesktopHeader({ scrolled }: Props) {
  const { isHome } = usePage();

  return (
    <div className='flex flex-row items-center justify-between w-full'>
      <Logo color={isHome && !scrolled ? "#ffffff" : "#000000"} />
      <DesktopHeaderMenu scrolled={scrolled} />
      <div className='flex flex-row items-center gap-x-2'>
        <GoldShower
          className={cn(scrolled ? "border-black/30 text-black" : "text-white")}
        />
        <LanguageSwitcher scrolled={scrolled} />
      </div>
    </div>
  );
}
