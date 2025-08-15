"use client";

import { Field, ErrorMessage } from "formik";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function ContactInformation() {
  const { dict } = useLocale();
  return (
    <div>
      <h2 className='text-lg font-medium text-gray-900'>
        {dict?.common?.contact_information || "Contact information"}
      </h2>

      <div className='mt-4'>
        <label
          htmlFor='email'
          className='block text-sm/6 font-medium text-gray-700'
        >
          {dict?.common?.email_address || "Email address"}{" "}
          <span className='text-red-600'>*</span>
        </label>
        <div className='mt-2'>
          <Field
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
          />
          <p className='mt-1 text-xs text-red-600'>
            <ErrorMessage name='email' />
          </p>
        </div>
      </div>
    </div>
  );
}
