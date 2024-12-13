import SmallContainer from "@/components/containers/small-container";
import React from "react";
import HomeBannerCard from "./card";

type Props = {
  items: { background: string; title: string; desc: string }[];
};

export default function Banners({ items }: Props) {
  return (
    <section className='banners' id='banners'>
      <SmallContainer>
        <div className='grid grid-cols-12 gap-4'>
          {items.map((item, index) => (
            <div key={index} className='col-span-12 md:col-span-6'>
              <HomeBannerCard {...item} />
            </div>
          ))}
        </div>
      </SmallContainer>
    </section>
  );
}
