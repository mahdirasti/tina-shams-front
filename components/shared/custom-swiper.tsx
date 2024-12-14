import React, {
  useRef,
  ReactNode,
  createContext,
  useContext,
  useCallback,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";
import type { Swiper as SwiperType, SwiperOptions } from "swiper/types";
import { cn } from "@/app/lib/utils";

interface SwiperComponentProps {
  beforeNode?: ReactNode;
  afterNode?: ReactNode;
  children: ReactNode[]; // Slides
  settings?: SwiperOptions; // Swiper settings
  customNavigation?: {
    prevEl?: React.ReactNode; // Custom previous navigation element
    nextEl?: React.ReactNode; // Custom next navigation element
  };
  className?: string;
  pagination?: boolean;
  onActiveIndexChange?: (activeSlideIndex: number) => void;
  onInit?: (swiper: SwiperType) => void;
}

const CustomSwiperContext = createContext<{
  navigation: { prev: ReactNode; next: ReactNode };
}>({
  navigation: {
    prev: null,
    next: null,
  },
});

export const useCustomSwiper = () => useContext(CustomSwiperContext);

const CustomSwiper: React.FC<SwiperComponentProps> = ({
  beforeNode,
  afterNode,
  children,
  settings = {},
  customNavigation,
  className,
  pagination = true,
  onActiveIndexChange,
  onInit,
}) => {
  const slider = useRef<SwiperType>();

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const prevButton = customNavigation?.prevEl && (
    <div ref={prevRef} onClick={() => slider && slider?.current?.slidePrev()}>
      {customNavigation.prevEl}
    </div>
  );

  const nextButton = customNavigation?.nextEl && (
    <div ref={nextRef} onClick={() => slider && slider?.current?.slideNext()}>
      {customNavigation.nextEl}
    </div>
  );

  const handleChangeActiveSlide = useCallback(
    (swiper: SwiperType) => {
      if (onActiveIndexChange) onActiveIndexChange(swiper.realIndex);
    },
    [onActiveIndexChange]
  );

  return (
    <CustomSwiperContext.Provider
      value={{ navigation: { next: nextButton, prev: prevButton } }}
    >
      {!!beforeNode && beforeNode}
      <div className={cn("custom-swiper-container", className)}>
        <Swiper
          modules={[
            Autoplay,
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            EffectFade,
          ]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onRealIndexChange={handleChangeActiveSlide}
          pagination={pagination ? { clickable: true } : undefined}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation) {
              const nav = swiper.params.navigation as any;
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
            }
          }}
          onInit={(swiper) => {
            slider.current = swiper;
            if (onInit) onInit(swiper);
          }}
          {...settings}
        >
          {children.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>
      {!!afterNode && afterNode}
    </CustomSwiperContext.Provider>
  );
};

export default CustomSwiper;
