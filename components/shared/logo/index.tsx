import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";
import TinaShamsIcon from "@/components/icons/tinashams";
import TinaShamsNonPersianIcon from "@/components/icons/tinashams-non-persian";
import TinaShamsSymbolIcon from "@/components/icons/tinashams-symbol";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  clickable?: boolean;
  color?: string;
};

export default function Logo({ clickable = true, color }: Props) {
  const { locale } = useLocale();

  let logoContent = (
    <>
      {locale === "en" ? (
        <TinaShamsIcon className='hidden md:flex' color={color} />
      ) : (
        <TinaShamsNonPersianIcon className='hidden md:flex' color={color} />
      )}
      <TinaShamsSymbolIcon className='md:hidden' color={color} />
    </>
  );

  return clickable ? (
    <Link href={getLinkWithLocale(`/`, locale)} title='Tina Shams'>
      {logoContent}
    </Link>
  ) : (
    <>{logoContent}</>
  );
}
