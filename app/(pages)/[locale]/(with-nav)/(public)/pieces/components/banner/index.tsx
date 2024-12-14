import React from "react";
import PieceBannerCard from "./card";

export default function PiecesBanners() {
  return (
    <div className='grid grid-cols-12 gap-4 h-auto md:h-[690px]'>
      <div className='col-span-12 md:col-span-6'>
        <PieceBannerCard
          background='/assets/images/pieces-banner-1.jpg'
          title='The Time'
          desc={`A splendid fusion of artistry \n and precision`}
          link='#'
        />
      </div>
      <div className='col-span-12 md:col-span-6 grid grid-cols-12 gap-4'>
        <div className='col-span-12'>
          <PieceBannerCard background='/assets/images/pieces-banner-3.jpg' />
        </div>
        <div className='col-span-12'>
          <PieceBannerCard background='/assets/images/pieces-banner-2.jpg' />
        </div>
      </div>
    </div>
  );
}
