"use client";

import React from "react";
import SectionImage from "./section-image";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import SectionText from "./section-text";
import { MainContainer } from "@/components/containers";

export default function Details() {
  const { dict } = useLocale();

  return (
    <MainContainer className='px-0'>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 md:col-span-6'>
          <SectionImage background='/assets/images/tina-shams-about-1.jpg' />
        </div>
        <div className='col-span-12 md:col-span-6'>
          <SectionText
            title={dict.common.about_section_one_title}
            desc={[
              dict.common.about_section_one_desc_1,
              dict.common.about_section_one_desc_2,
              dict.common.about_section_one_desc_3,
            ]}
          />
        </div>
        <div className='col-span-12 md:col-span-6'>
          <SectionText
            title={dict.common.about_section_two_title}
            desc={[
              dict.common.about_section_two_desc_1,
              dict.common.about_section_two_desc_2,
            ]}
          />
        </div>
        <div className='col-span-12 md:col-span-6'>
          <SectionImage background='/assets/images/tina-shams-about-2.jpg' />
        </div>
      </div>
    </MainContainer>
  );
}
