"use client";

import Logo from "@/components/shared/logo";
import BurgerMenu from "./burger-menu";
import DesktopHeader from "./desktop";
import { MainContainer } from "@/components/containers";
import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import MobileLanguageSwitcher from "./mobile-language-switcher";

export const headerMenuItems: {
  title: string;
  href: string;
  forceLink?: string;
}[] = [
  { title: "about_us", href: "/about" },
  { title: "pieces", href: "/pieces" },
  { title: "contact", href: "/contact" },
  { title: "blog", href: "/blog", forceLink: "/en/blog" },
  { title: "collaboration", href: "/collaboration" },
];

export default function MainHeaderPart() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", scrollHandler);
    () => {
      return window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header
      className={cn(
        "px-0 md:px-2 fixed left-0 w-full top-0 z-[1000] md:py-6 transition-all",
        scrolled ? "bg-white/50 backdrop-blur-md" : ""
      )}
    >
      <MainContainer className='main-header'>
        {/* DESKTOP */}
        <div className='hidden md:flex desktop-header'>
          <DesktopHeader scrolled={scrolled} />
        </div>
        {/* DESKTOP */}
        {/* Mobile */}
        <div className='flex flex-row items-center justify-between md:hidden p-4 px-4 z-[1000] mobile-header'>
          <div className='relative z-20'>
            <Logo />
          </div>
          <div className='flex flex-row items-center gap-x-2'>
            <MobileLanguageSwitcher />
            <BurgerMenu />
          </div>
        </div>
        {/* Mobile */}
      </MainContainer>
    </header>
  );
}
