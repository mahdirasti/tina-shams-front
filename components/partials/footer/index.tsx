"use client";

import { MainContainer } from "@/components/containers";
import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";
import CopyRight from "./copyright";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";
export default function FooterPart() {
  const { locale, dict } = useLocale();

  return (
    <footer className='border-t border-t-black py-8 mt-16 flex flex-col gap-y-4'>
      <MainContainer className='flex flex-col md:flex-row md:grid md:grid-cols-3 items-center gap-y-4 justify-between'>
        <CopyRight />
        <div className='flex flex-row gap-x-4 items-center justify-center'>
          {[
            {
              label: dict.common.terms_of_use,
              link: getLinkWithLocale("/pages/terms-of-use", locale),
            },
            {
              label: dict.common.faq,
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
        <div className='social-medias flex flex-row items-center justify-end gap-x-4'>
          <div className='flex items-center justify-center gap-2'>
            <img
              referrerPolicy='origin'
              id='rgvjoeukjxlzwlaosizpfukz'
              style={{ cursor: "pointer", width: "72px", height: "auto" }}
              onClick={() =>
                window.open(
                  "https://logo.samandehi.ir/Verify.aspx?id=381496&p=xlaomcsirfthaodspfvlgvka",
                  "Popup",
                  "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
                )
              }
              alt='logo-samandehi'
              src='https://logo.samandehi.ir/logo.aspx?id=381496&p=qftiaqgwnbpdshwlbsiywlbq'
            />
            <a
              referrerPolicy='origin'
              target='_blank'
              href='https://trustseal.enamad.ir/?id=626024&Code=MHtp3w9wNVCLzFMyvwYP33CEHRTmWc7c'
            >
              <img
                referrerPolicy='origin'
                src='https://trustseal.enamad.ir/logo.aspx?id=626024&Code=MHtp3w9wNVCLzFMyvwYP33CEHRTmWc7c'
                alt=''
                className='w-[72px] h-auto'
                //@ts-ignore
                code='MHtp3w9wNVCLzFMyvwYP33CEHRTmWc7c'
              />
            </a>
          </div>
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
