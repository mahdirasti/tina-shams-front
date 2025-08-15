"use client";

import { useField, Field } from "formik";
import type { DeliveryMethodType } from "../index";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function DeliveryMethod({
  deliveryMethods,
}: {
  deliveryMethods: DeliveryMethodType[];
}) {
  const [field] = useField<string>({ name: "delivery_method_id" });
  const { dict } = useLocale();

  return (
    <fieldset>
      <legend className='text-lg font-medium text-gray-900'>
        {dict?.common?.delivery_method || "Delivery method"}{" "}
        <span className='text-red-600'>*</span>
      </legend>

      <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
        {deliveryMethods.map((m) => (
          <label
            key={m.id}
            className='group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent'
          >
            <div className='flex flex-1'>
              <div className='flex flex-col'>
                <span className='block text-sm font-medium text-gray-900'>
                  {m.title}
                </span>
                <span className='mt-1 flex items-center text-sm text-gray-500'>
                  {m.turnaround}
                </span>
                <span className='mt-6 text-sm font-medium text-gray-900'>
                  {m.price.toLocaleString()}
                </span>
              </div>
            </div>
            <Field
              type='radio'
              name='delivery_method_id'
              value={m.id}
              className='absolute inset-0 opacity-0 cursor-pointer'
            />
            <span
              aria-hidden='true'
              className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                field.value === m.id
                  ? "border-indigo-500"
                  : "border-transparent"
              }`}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
