"use client";

import CustomSwiper from "@/components/shared/custom-swiper";
import React, { useEffect, useRef } from "react";
import { Swiper } from "swiper/types";
import PieceSliderItem from "./item";

export default function Slider() {
  const swiper = useRef<Swiper>();
  useEffect(() => {
    const eventListener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          swiper.current?.slideNext();
          break;
        case "ArrowLeft":
          swiper.current?.slidePrev();
          break;
      }
    };

    window.addEventListener("keyup", eventListener);

    return () => {
      window.removeEventListener("keyup", eventListener);
    };
  }, []);

  return (
    <CustomSwiper
      settings={{
        slidesPerView: 1,
        loop: true,
        effect: "fade",
        pagination: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      }}
      onInit={(s) => (swiper.current = s)}
    >
      {[
        {
          background: "/assets/images/slide-1-piece.jpg",
          title: "Explore the lineup.",
          desc: "The Mad Love ring is a bold statement piece \n — combining elegance and charm.",
        },
        {
          background: "/assets/images/banner-2.jpg",
          title: "The Time",
          desc: "Introducing The Time Collection \n — a splendid fusion of artistry and precision",
        },
      ].map((content, index) => (
        <PieceSliderItem key={index} {...content} />
      ))}
    </CustomSwiper>
  );
}
