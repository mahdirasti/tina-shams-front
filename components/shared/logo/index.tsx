import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  clickable?: boolean;
};

export default function Logo({ clickable = true }: Props) {
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
    <Link href={`/`} title='Tina Shams'>
      {logoContent}
    </Link>
  ) : (
    <>{logoContent}</>
  );
}
