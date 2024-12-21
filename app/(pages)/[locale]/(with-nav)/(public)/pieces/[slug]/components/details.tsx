"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import {
  cn,
  getFullAssets,
  getLinkWithLocale,
  gramsAmount,
  purityAmount,
} from "@/app/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PieceType } from "@/types/piece";
import Link from "next/link";

type Props = {
  product: PieceType;
};
export default function PiecesDetails({ product }: Props) {
  const { dict, dir, locale } = useLocale();

  return (
    <div className='px-4 md:px-0'>
      <div className='product-details h-auto md:h-[400px] relative w-full overflow-hidden'>
        {!!product?.cover && (
          <img
            src={getFullAssets(product.cover.fileName)}
            alt=''
            className='object-cover object-center md:absolute md:top-0 md:left-0 md:right-0 md:bottom-0 mb-4 md:mb-0 w-full'
          />
        )}
        <div
          className={cn(
            "details relative md:absolute md:top-12 flex flex-col items-center md:items-start gap-y-4",
            dir === "ltr" ? "md:left-12" : "md:right-12"
          )}
        >
          {[
            {
              title: dict.common.weight_range,
              value: gramsAmount(product.weight ?? 0, dict.common.grams),
            },
            {
              title: dict.common.purity,
              value: purityAmount(product.purity, dict.common.purity_unit_k),
            },
            {
              title: dict.common.design,
              value: product.design_desc,
            },
          ].map((item, key) => (
            <div
              key={key}
              className={cn(
                "flex flex-col md:block items-center text-center gap-x-2 w-full md:w-[300px] max-w-full",
                dir === "ltr" ? "md:text-left" : "md:text-right"
              )}
            >
              <strong
                className={cn(
                  "flex md:inline-flex",
                  dir === "ltr" ? "md:mr-2" : "md:ml-2"
                )}
              >{`${item.title}: `}</strong>
              {item.value}
            </div>
          ))}
          <div className='w-full md:w-auto mt-8'>
            <Link
              href={getLinkWithLocale(`/contact`, locale)}
              className={buttonVariants({
                variant: "default",
                class: "w-full md:w-auto",
              })}
            >
              {dict.common.order}
            </Link>
          </div>
        </div>
      </div>
      <div
        className='mt-16 [&_p]:mb-4'
        dangerouslySetInnerHTML={{ __html: product?.content ?? "" }}
      ></div>
    </div>
  );
}
