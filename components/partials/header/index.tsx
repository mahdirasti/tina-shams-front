"use client";

import DesktopHeader from "./desktop";
import { MainContainer } from "@/components/containers";
import { useEffect, useMemo, useState } from "react";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import { usePathname } from "next/navigation";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import Banners from "./banners";
import { useApi } from "@/app/hooks";

export const headerMenuItems: {
  title: string;
  href: string;
  forceLink?: string;
}[] = [
  { title: "about_us", href: "/about" },
  { title: "pieces", href: "/pieces" },
  { title: "blog", href: "/blog", forceLink: "/fa/blog" },
  { title: "collaboration", href: "/collaboration" },
];

const defaultSrolledStateRoutes = [
  "/shop",
  "/checkout",
  "/checkout/[^/]+",
  "/shop/[^/]+",
  "/pieces/[^/]+",
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

  const { data: bannersRes } = useApi(`/banners/search`);
  const bannerItems = useMemo(() => {
    let raw: any[] = [];
    if (Array.isArray(bannersRes?.data)) raw = bannersRes.data;
    else if (Array.isArray(bannersRes?.data?.data?.items))
      raw = bannersRes.data.data.items;
    else if (Array.isArray(bannersRes?.data?.data)) raw = bannersRes.data.data;
    else if (Array.isArray(bannersRes?.data?.items))
      raw = bannersRes.data.items;

    return raw
      .map((banner) => {
        const titleField = banner?.title as
          | Array<{ language: string; value: string }>
          | string
          | undefined;
        let titleValue = "";
        if (Array.isArray(titleField)) {
          titleValue =
            titleField.find((t) => t.language === locale)?.value ??
            titleField[0]?.value ??
            "";
        } else if (typeof titleField === "string") {
          titleValue = titleField;
        }

        const linkValue = banner?.link ? banner.link : "";

        return { title: titleValue, link: linkValue };
      })
      .filter((b) => b.title);
  }, [bannersRes, locale]);

  return (
    <>
      <Banners items={bannerItems} />
      <header
        className={cn(
          "px-0 md:px-2 sticky left-0 w-full top-0 z-[1000] md:py-6 transition-all",
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
    </>
  );
}
