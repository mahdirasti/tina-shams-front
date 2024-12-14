"use client";

import Logo from "@/components/shared/logo";
import BurgerMenu from "./burger-menu";
import DesktopHeader from "./desktop";
import { MainContainer } from "@/components/containers";

export const headerMenuItems: { title: string; href: string }[] = [
  { title: "About Us", href: "/about" },
  { title: "Pieces", href: "/pieces" },
  { title: "Contact", href: "/contact" },
  { title: "Collaboration", href: "/collaboration" },
];

export default function MainHeaderPart() {
  return (
    <header className='px-0 md:px-2 md:fixed left-0 w-full top-0 z-10'>
      <MainContainer className='main-header'>
        {/* DESKTOP */}
        <div className='hidden md:flex desktop-header mt-6'>
          <DesktopHeader />
        </div>
        {/* DESKTOP */}
        {/* Mobile */}
        <div className='flex flex-row items-center justify-between md:hidden p-4 px-4 z-30 mobile-header'>
          <div className='relative z-20'>
            <Logo />
          </div>
          <BurgerMenu />
        </div>
        {/* Mobile */}
      </MainContainer>
    </header>
  );
}
