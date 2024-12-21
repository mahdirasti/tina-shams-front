"use client";

import Logo from "@/components/shared/logo";
import BurgerMenu from "./burger-menu";
import DesktopHeader from "./desktop";
import { MainContainer } from "@/components/containers";
import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import { usePathname } from "next/navigation";

export const headerMenuItems: { title: string; href: string }[] = [
  { title: "about_us", href: "/about" },
  { title: "pieces", href: "/pieces" },
  { title: "contact", href: "/contact" },
  { title: "collaboration", href: "/collaboration" },
];

const filledPaths = ["/about"];

export default function MainHeaderPart() {
  const pathname = usePathname();
  console.log("pathname", pathname);

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
          <DesktopHeader />
        </div>
        {/* DESKTOP */}
        {/* Mobile */}
        <div className='flex flex-row items-center justify-between md:hidden p-4 px-4 z-[1000] mobile-header'>
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
