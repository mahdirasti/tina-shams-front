"use client";

import { useState } from "react";
import { ProductType } from "@/types/product";
import { Radio, RadioGroup } from "@headlessui/react";
import { classNames } from "@/app/lib/utils";

type Props = {
  item: ProductType;
};

const colors = [
  { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
  {
    name: "Heather Grey",
    bgColor: "bg-gray-400",
    selectedColor: "ring-gray-400",
  },
];

const sizes = [
  { name: "XXS", inStock: true },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: false },
];

export default function ProductActions({ item }: Props) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);

  return (
    <form>
      {/* Color picker */}
      <div>
        <h2 className='text-sm font-medium text-gray-900'>Color</h2>

        <fieldset aria-label='Choose a color' className='mt-2'>
          <RadioGroup
            value={selectedColor}
            onChange={setSelectedColor}
            className='flex items-center gap-x-3'
          >
            {colors.map((color) => (
              <Radio
                key={color.name}
                value={color}
                aria-label={color.name}
                className={classNames(
                  color.selectedColor,
                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                )}
              >
                <span
                  aria-hidden='true'
                  className={classNames(
                    color.bgColor,
                    "size-8 rounded-full border border-black/10"
                  )}
                />
              </Radio>
            ))}
          </RadioGroup>
        </fieldset>
      </div>

      {/* Size picker */}
      <div className='mt-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-medium text-gray-900'>Size</h2>
        </div>

        <fieldset aria-label='Choose a size' className='mt-2'>
          <RadioGroup
            value={selectedSize}
            onChange={setSelectedSize}
            className='grid grid-cols-3 gap-3 sm:grid-cols-6'
          >
            {sizes.map((size) => (
              <Radio
                key={size.name}
                value={size}
                disabled={!size.inStock}
                className={classNames(
                  size.inStock
                    ? "cursor-pointer focus:outline-none"
                    : "cursor-not-allowed opacity-25",
                  "flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-primary data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-primary data-[focus]:ring-offset-2 data-[checked]:hover:bg-primary/80 sm:flex-1"
                )}
              >
                {size.name}
              </Radio>
            ))}
          </RadioGroup>
        </fieldset>
      </div>

      <button
        type='submit'
        className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      >
        Add to cart
      </button>
    </form>
  );
}
