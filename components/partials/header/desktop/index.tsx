import Logo from "@/components/shared/logo";
import React from "react";
import LanguageSwitcher from "../language-switcher";
import DesktopHeaderMenu from "./menu";
import { usePage } from "@/app/hooks/use-page";

type Props = {
  scrolled: boolean;
};

export default function DesktopHeader({ scrolled }: Props) {
  const { isAbout, isHome } = usePage();

  return (
    <div className='flex flex-row items-center justify-between w-full'>
      <Logo color={(isHome || isAbout) && !scrolled ? "#ffffff" : "#000000"} />
      <DesktopHeaderMenu scrolled={scrolled} />
      <LanguageSwitcher scrolled={scrolled} />
    </div>
  );
}
