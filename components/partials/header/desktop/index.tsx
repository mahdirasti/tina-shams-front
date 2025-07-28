import Logo from "@/components/shared/logo";
import React from "react";
import LanguageSwitcher from "../language-switcher";
import { usePage } from "@/app/hooks/use-page";
import GoldShower from "../gold-shower";
import { cn } from "@/app/lib/utils";
import HeaderMenu from "./menu";
import ShopCart from "./cart";
import Account from "./account";
import Support from "./support";

type Props = {
  scrolled: boolean;
};

export default function DesktopHeader({ scrolled }: Props) {
  const { isHome } = usePage();

  const iconColors = isHome && !scrolled ? "#ffffff" : "#000000";

  return (
    <div className='flex flex-row items-center justify-between w-full py-4 md:py-0'>
      <div className='flex flex-row items-center gap-x-2'>
        <HeaderMenu scrolled={scrolled} color={iconColors} />
        <Logo color={iconColors} />
      </div>
      {/* <DesktopHeaderMenu scrolled={scrolled} /> */}
      <div className='flex flex-row items-center'>
        {/* <GoldShower
          className={cn(scrolled ? "" : isHome ? "text-white" : "")}
        /> */}
        <LanguageSwitcher scrolled={scrolled} />
        <div className='flex flex-row items-center gap-x-2'>
          {/* <Support scrolled={scrolled} /> */}
          <Account scrolled={scrolled} />
          <ShopCart scrolled={scrolled} />
        </div>
      </div>
    </div>
  );
}
