"use client";

import { Field, useField } from "formik";
import type { PaymentMethodType } from "../index";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function PaymentMethods({
  paymentMethods,
}: {
  paymentMethods: PaymentMethodType[];
}) {
  const [field] = useField<string>({ name: "payment_method_id" });
  const { dict } = useLocale();
  return (
    <div>
      <h2 className='text-lg font-medium text-gray-900'>
        {dict?.checkout?.payment || "Payment"}{" "}
        <span className='text-red-600'>*</span>
      </h2>
      <div className='mt-4 grid grid-cols-1 gap-4'>
        {paymentMethods.map((pm) => (
          <label
            key={pm.id}
            className='flex items-center gap-3 rounded-lg border border-gray-300 bg-white p-3'
          >
            <Field type='radio' name='payment_method_id' value={pm.id} />
            <span className='text-sm text-gray-900'>{pm.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
