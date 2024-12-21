import Logo from "@/components/shared/logo";
import React from "react";
import LanguageSwitcher from "../language-switcher";
import DesktopHeaderMenu from "./menu";

type Props = {
  scrolled: boolean;
};

export default function DesktopHeader({ scrolled }: Props) {
  return (
    <div className='flex flex-row items-center justify-between w-full'>
      <Logo />
      <DesktopHeaderMenu scrolled={scrolled} />
      <LanguageSwitcher />
    </div>
  );
}
