"use client";

import Image from "next/image";
import Desc from "./desc";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn } from "@/app/lib/utils";

type Props = {
  title: string;
  desc: string;
  background: string;
};
export default function HomeBannerCard({ title, desc, background }: Props) {
  const { dir } = useLocale();

  return (
    <div className='w-full h-[390px] md:h-[466px] relative after:absolute after:z-[1] after:bottom-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/80 after:to-transparent'>
      <Image
        fill
        src={background}
        alt={title}
        className='object-cover object-center'
      />
      <div
        className={cn(
          "details absolute bottom-0 w-full z-[2] text-neutral-on-foreground flex flex-col gap-y-2 items-center md:items-start p-6",
          dir === "ltr" ? "left-0" : "right-0"
        )}
      >
        <h3 className='font-bold text-4xl'>{title}</h3>
        <Desc text={desc} />
      </div>
    </div>
  );
}
