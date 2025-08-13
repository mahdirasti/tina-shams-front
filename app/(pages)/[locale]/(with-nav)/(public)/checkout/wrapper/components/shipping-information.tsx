"use client";

import { Field, ErrorMessage } from "formik";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";

export default function ShippingInformation() {
  const { dict } = useLocale();
  return (
    <div>
      <h2 className='text-lg font-medium text-gray-900'>
        {dict?.checkout?.shipping_information || "Shipping information"}
      </h2>

      <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
        <div>
          <label
            htmlFor='first_name'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.first_name || "First name"}{" "}
            <span className='text-red-600'>*</span>
          </label>
          <div className='mt-2'>
            <Field
              id='first_name'
              name='first_name'
              type='text'
              autoComplete='given-name'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
            <p className='mt-1 text-xs text-red-600'>
              <ErrorMessage name='first_name' />
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor='last_name'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.last_name || "Last name"}{" "}
            <span className='text-red-600'>*</span>
          </label>
          <div className='mt-2'>
            <Field
              id='last_name'
              name='last_name'
              type='text'
              autoComplete='family-name'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
            <p className='mt-1 text-xs text-red-600'>
              <ErrorMessage name='last_name' />
            </p>
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='company'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.company || "Company"}
          </label>
          <div className='mt-2'>
            <Field
              id='company'
              name='company'
              type='text'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='address_line1'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.address || "Address"}{" "}
            <span className='text-red-600'>*</span>
          </label>
          <div className='mt-2'>
            <Field
              id='address_line1'
              name='address_line1'
              type='text'
              autoComplete='street-address'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
            <p className='mt-1 text-xs text-red-600'>
              <ErrorMessage name='address_line1' />
            </p>
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='address_line2'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.address_line2 || "Apartment, suite, etc."}
          </label>
          <div className='mt-2'>
            <Field
              id='address_line2'
              name='address_line2'
              type='text'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='city'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.city || "City"}{" "}
            <span className='text-red-600'>*</span>
          </label>
          <div className='mt-2'>
            <Field
              id='city'
              name='city'
              type='text'
              autoComplete='address-level2'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
            <p className='mt-1 text-xs text-red-600'>
              <ErrorMessage name='city' />
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor='country'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.country || "Country"}{" "}
            <span className='text-red-600'>*</span>
          </label>
          <div className='mt-2 grid grid-cols-1'>
            <Field
              as='select'
              id='country'
              name='country'
              autoComplete='country-name'
              className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            >
              <option value='IR'>Iran</option>
              <option value='TR'>Turkey</option>
              <option value='AE'>UAE</option>
            </Field>
          </div>
        </div>

        <div>
          <label
            htmlFor='region'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.region || "State / Province"}{" "}
            <span className='text-red-600'>*</span>
          </label>
          <div className='mt-2'>
            <Field
              id='region'
              name='region'
              type='text'
              autoComplete='address-level1'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
            <p className='mt-1 text-xs text-red-600'>
              <ErrorMessage name='region' />
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor='postal_code'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.postal_code || "Postal code"}{" "}
            <span className='text-red-600'>*</span>
          </label>
          <div className='mt-2'>
            <Field
              id='postal_code'
              name='postal_code'
              type='text'
              autoComplete='postal-code'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
            <p className='mt-1 text-xs text-red-600'>
              <ErrorMessage name='postal_code' />
            </p>
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='phone'
            className='block text-sm/6 font-medium text-gray-700'
          >
            {dict?.checkout?.phone || "Phone"}{" "}
            <span className='text-red-600'>*</span>
          </label>
          <div className='mt-2'>
            <Field
              id='phone'
              name='phone'
              type='text'
              autoComplete='tel'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
            />
            <p className='mt-1 text-xs text-red-600'>
              <ErrorMessage name='phone' />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
