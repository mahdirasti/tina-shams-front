import Logo from "@/components/shared/logo";
import React from "react";
import LanguageSwitcher from "../language-switcher";
import DesktopHeaderMenu from "./menu";

export default function DesktopHeader() {
  return (
    <div className='flex flex-row items-center justify-between w-full'>
      <Logo />
      <DesktopHeaderMenu />
      <LanguageSwitcher />
    </div>
  );
}
