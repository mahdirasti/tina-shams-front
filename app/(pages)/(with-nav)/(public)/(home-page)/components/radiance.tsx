import SmallContainer from "@/components/containers/small-container";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Radiance() {
  return (
    <SmallContainer>
      <section
        className='radience h-[760px] md:h-[520px] w-full relative before:z-[10] before:absolute before:right-0 before:top-0 before:bottom-0 before:w-[100px] before:bg-gradient-to-l before:from-background before:to-transparent after:absolute after:bottom-0 after:left-0 after:w-full after:bg-gradient-to-t after:top-0 after:from-white/70 after:to-transparent after:z-[9] md:after:hidden'
        id='radience-bg'
      >
        <Image
          alt=''
          src={`/assets/images/radience-bg.jpeg`}
          fill
          className='z-[9] object-cover object-center desktop-bg hidden md:flex'
        />
        <Image
          alt=''
          src={`/assets/images/radience-bg-mobile.jpg`}
          fill
          className='z-[9] object-cover object-center mobile-bg md:hidden'
        />
        <div className='details p-6 md:p-0 z-[20] absolute left-0 md:left-[450px] md:top-[50%] md:translate-y-[-50%] bottom-0 md:bottom-[initial] flex flex-col items-center md:items-start gap-y-4'>
          <h2 className='font-medium text-5xl mb-4 md:mb-0'>
            <span className='w-[150px] h-[1px] bg-black inline-flex mr-3'></span>
            Unveil <br />
            Your Radiance
          </h2>
          <p className='text-center md:text-left'>
            Tina Shams is a luxury jewelry brand that captures elegance and
            modern sophistication. With a unique blend of timeless craftsmanship
            and contemporary design, Tina Shams offers stunning collections that
            bring out the brilliance in every piece. Whether its for a special
            occasion or everyday glam, the brand lives by its slogan, Bling and
            Shine, ensuring every wearer sparkles with confidence.
          </p>
          <Link
            className={buttonVariants({
              variant: "default",
              class: "!rounded-[100px] w-[235px] md:w-[117px]",
            })}
            href={`#`}
          >
            Read More
          </Link>
        </div>
      </section>
    </SmallContainer>
  );
}
