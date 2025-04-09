"use client";

import { MainContainer } from "@/components/containers";
import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import CopyRight from "./copyright";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";
export default function FooterPart() {
  const { locale } = useLocale();

  return (
    <footer className='border-t border-t-black py-8 mt-16 flex flex-col gap-y-4'>
      <MainContainer className='flex flex-col md:flex-row items-center gap-y-4 justify-between'>
        <CopyRight />
        <div className='flex flex-row gap-x-4 items-center'>
          {[
            {
              label: "Terms of Use",
              link: getLinkWithLocale("/pages/terms-of-use", locale),
            },
            {
              label: "FAQ",
              link: getLinkWithLocale("/pages/faq", locale),
            },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target='_blank'
              className='text-black/70 hover:text-black'
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className='social-medias flex flex-row items-center gap-x-4'>
          {[
            // {
            //   icon: (
            //     <Image
            //       width={16}
            //       height={16}
            //       src={`/assets/images/x-icon.svg`}
            //       alt=''
            //     />
            //   ),
            //   link: "#",
            // },
            // { icon: <Facebook />, link: "#" },
            {
              icon: <Instagram />,
              link: "https://www.instagram.com/bytinashams/",
            },
            // { icon: <Linkedin />, link: "#" },
          ].map((item, index) => (
            <Link key={index} href={item.link} target='_blank'>
              {item.icon}
            </Link>
          ))}
        </div>
      </MainContainer>
    </footer>
  );
}
