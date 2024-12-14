import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  clickable?: boolean;
};

export default function Logo({ clickable = true }: Props) {
  const { locale } = useLocale();

  let logoContent = (
    <Image
      width={44}
      height={44}
      src={`/assets/images/tina-shams-logo.svg`}
      alt='Tina Shams'
      className='w-[24px] h-[24px] md:w-[44px] md:h-[44px]'
    />
  );

  return clickable ? (
    <Link href={getLinkWithLocale(`/`, locale)} title='Tina Shams'>
      {logoContent}
    </Link>
  ) : (
    <>{logoContent}</>
  );
}
