"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { gramsAmount, purityAmount } from "@/app/lib/utils";
import { OrgButton } from "@/components/shared-ui";
import { PieceType } from "@/types/piece";
import Image from "next/image";

type Props = {
  product: PieceType;
};
export default function PiecesDetails({ product }: Props) {
  const { dict } = useLocale();

  return (
    <>
      <div className='product-details h-auto md:h-[400px] relative w-full overflow-hidden'>
        <img
          src={`/assets/images/product-cover-2.jpg`}
          alt=''
          className='object-cover object-center md:absolute md:top-0 md:left-0 md:right-0 md:bottom-0 mb-4 md:mb-0 w-full'
        />
        <div className='details relative md:absolute md:top-12 md:left-12 flex flex-col items-center md:items-start gap-y-4'>
          {[
            {
              title: dict.common.weight_range,
              value: gramsAmount(product.weight, dict.common.grams),
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
              className='flex flex-col md:block items-center text-center md:text-left gap-x-2 w-full md:w-[300px] max-w-full'
            >
              <strong className='flex md:inline-flex md:mr-2'>{`${item.title}: `}</strong>
              {item.value}
            </div>
          ))}
          <div className='w-full md:w-auto mt-8'>
            <OrgButton className='w-full md:w-auto'>
              {dict.common.order}
            </OrgButton>
          </div>
        </div>
      </div>
      <div
        className='mt-16 [&_p]:mb-4'
        dangerouslySetInnerHTML={{ __html: product?.content ?? "" }}
      ></div>
    </>
  );
}
