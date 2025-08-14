"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn } from "@/app/lib/utils";

export type SizeOption = {
  id: string;
  name: string;
  value: string;
  inStock?: boolean;
};

type Props = {
  attributeId: string;
  options: SizeOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
};

export default function SizePicker({
  attributeId,
  options,
  selectedValue,
  onChange,
}: Props) {
  const { dict } = useLocale();

  if (!attributeId || options.length === 0) return null;

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-gray-900'>
          {dict?.common?.size || "Size"}
        </h3>
        <a
          href='#'
          className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
        >
          {dict?.common?.size_guide || "Size guide"}
        </a>
      </div>

      <fieldset
        aria-label={dict?.common?.choose_a_size || "Choose a size"}
        className='mt-4'
      >
        <div className='grid grid-cols-4 gap-3'>
          {options.map((size) => (
            <label
              key={size.id}
              aria-label={size.name}
              className={cn(
                "group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25",
                selectedValue === size.value &&
                  "bg-black border-black text-white"
              )}
            >
              <input
                value={size.value}
                checked={selectedValue === size.value}
                onChange={(e) => onChange(e.target.value)}
                name={`attr-${attributeId}`}
                type='radio'
                disabled={size.inStock === false}
                className='absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed'
              />
              <span className='text-sm font-medium uppercase group-has-checked:text-white'>
                {size.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
