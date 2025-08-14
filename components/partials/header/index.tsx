"use client";

import DesktopHeader from "./desktop";
import { MainContainer } from "@/components/containers";
import { useEffect, useMemo, useState } from "react";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import { usePathname } from "next/navigation";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export const headerMenuItems: {
  title: string;
  href: string;
  forceLink?: string;
}[] = [
  { title: "shop", href: "/shop" },
  { title: "about_us", href: "/about" },
  { title: "pieces", href: "/pieces" },
  { title: "contact", href: "/contact" },
  { title: "blog", href: "/blog", forceLink: "/fa/blog" },
  { title: "collaboration", href: "/collaboration" },
];

const defaultSrolledStateRoutes = [
  "/shop",
  "/checkout",
  "/shop/[^/]+",
  "/profile",
  "/profile/orders/[^/]+",
  "/profile/[^/]+",
  "/checkout/[order_id]/thanks",
];

export default function MainHeaderPart() {
  const { locale } = useLocale();
  const pathname = usePathname();

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

  const finalScrolled = useMemo(() => {
    // Separate exact routes from regex patterns
    const exactRoutes = defaultSrolledStateRoutes.filter(
      (route) => !route.includes("[")
    );
    const regexRoutes = defaultSrolledStateRoutes.filter((route) =>
      route.includes("[")
    );

    // Check for exact matches first
    const exactMatch = exactRoutes.find(
      (route) => getLinkWithLocale(route, locale) === pathname
    );
    if (exactMatch) {
      return true;
    }

    // Check for regex patterns
    const regexMatch = regexRoutes.find((route) => {
      // Handle Next.js dynamic route patterns (e.g., /shop/[slug])
      if (
        route.includes("[") &&
        route.includes("]") &&
        !route.includes("[^/]+")
      ) {
        const regexPattern = route
          .replace(/\[([^\]]+)\]/g, "[^/]+") // Replace [slug] with [^/]+
          .replace(/\//g, "\\/"); // Escape forward slashes
        const regex = new RegExp(`^/${locale}${regexPattern}$`);
        return regex.test(pathname);
      }

      // Handle direct regex patterns (e.g., /shop/[^/]+)
      if (route.includes("[^/]+")) {
        const regexPattern = route.replace(/\//g, "\\/"); // Escape forward slashes
        const regex = new RegExp(`^/${locale}${regexPattern}$`);
        return regex.test(pathname);
      }

      return false;
    });

    if (regexMatch) {
      return true;
    }

    return scrolled;
  }, [scrolled, pathname, locale]);

  return (
    <header
      className={cn(
        "px-0 md:px-2 fixed left-0 w-full top-0 z-[1000] md:py-6 transition-all",
        scrolled ? "bg-white/50 backdrop-blur-md" : ""
      )}
    >
      <MainContainer className='main-header'>
        {/* DESKTOP */}
        <DesktopHeader scrolled={finalScrolled} />
        {/* DESKTOP */}
        {/* Mobile */}
        {/* <div className='flex flex-row items-center justify-between md:hidden p-4 px-4 z-[1000] mobile-header'>
          <div className='relative z-20'>
            <Logo />
          </div>
          <div className='flex flex-row items-center gap-x-2'>
            <GoldShower className={cn("border-transparent text-black")} />
            <MobileLanguageSwitcher />
            <BurgerMenu />
          </div>
        </div> */}
        {/* Mobile */}
      </MainContainer>
    </header>
  );
}
