import SimpleVideo from "@/components/shared/simple-video";
import { LocaleType } from "@/types/locale";
import React from "react";
import { getDictionary } from "../../../dictionaries";
import Logo from "@/components/shared/logo";
import Link from "next/link";
import { getLinkWithLocale } from "@/app/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export default async function AuthSignInPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className='flex h-screen flex-1'>
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <Logo />
            <div className='flex flex-col mt-8 items-start'>
              <Link
                href={getLinkWithLocale(`/`, locale)}
                className={buttonVariants({
                  variant: "text",
                  class:
                    "w-auto pl-0 hover:text-black text-black/40 hover:underline",
                })}
              >
                {dict.common.back_to_home}
              </Link>
              <h2 className='text-2xl/9 font-bold tracking-tight text-gray-900'>
                {dict.common.auth_sign_in_title}
              </h2>
            </div>
          </div>

          <div className='mt-10'>
            <div>
              <form action='#' method='POST' className='space-y-6'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    {dict.common.phone_number}
                  </label>
                  <div className='mt-2'>
                    <input
                      id='phone'
                      name='phone'
                      required
                      className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    />
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                  >
                    {dict.common.continue}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='relative hidden w-0 flex-1 lg:block'>
        <div className='absolute top-0 left-0 w-full h-full bg-black/50 z-10'></div>
        <SimpleVideo
          src='/assets/videos/cover.mp4'
          loop
          autoPlay
          muted
          className='absolute top-0 left-0 w-full h-full object-cover'
        />
      </div>
    </div>
  );
}
