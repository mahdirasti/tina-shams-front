"use client";

import { classNames } from "@/app/lib/utils";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export type ColorOption = {
  id: string;
  name: string;
  value: string; // expected to be CSS color (hex/name)
  meta?: any;
};

type Props = {
  attributeId: string;
  options: ColorOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
};

export default function ColorPicker({
  attributeId,
  options,
  selectedValue,
  onChange,
}: Props) {
  const { dict } = useLocale();

  if (!attributeId || options.length === 0) return null;

  return (
    <div>
      <h3 className='text-sm font-medium text-gray-900'>
        {dict?.common?.color || "Color"}
      </h3>

      <fieldset
        aria-label={dict?.common?.choose_a_color || "Choose a color"}
        className='mt-4'
      >
        <div className='flex items-center gap-x-3'>
          {options.map((color) => (
            <label key={color.id} className='flex rounded-none cursor-pointer'>
              <input
                value={color.value}
                checked={selectedValue === color.value}
                onChange={(e) => onChange(e.target.value)}
                name={`attr-${attributeId}`}
                type='radio'
                aria-label={color.name}
                className={classNames(
                  "size-8 transition-all rounded-md duration-300 border appearance-none forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3",
                  selectedValue === color.value
                    ? "scale-110 border-black"
                    : "border-transparent"
                )}
                style={{ backgroundColor: color?.meta?.color || color.value }}
              />
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
