"use client";

import SimpleVideo from "@/components/shared/simple-video";
import { LocaleType } from "@/types/locale";
import React, { useState } from "react";
import { getDictionary } from "../../../dictionaries";
import Logo from "@/components/shared/logo";
import Link from "next/link";
import { getLinkWithLocale } from "@/app/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { loginHandler } from "@/redux/slices/auth-slice";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { useAuth } from "@/app/hooks";
import axiosInstance from "@/app/lib/axios";
import { useQueryParams } from "@/app/utils";
import { storeUserToken } from "@/app/actions/auth";

type Props = {
  params: Promise<{ locale: LocaleType }>;
};

export default function AuthSignInPage({ params }: Props) {
  const { locale, dict } = useLocale();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { locale: currentLocale } = useLocale();
  const { requireGuest } = useAuth();

  const { query } = useQueryParams();

  // Redirect authenticated users
  React.useEffect(() => {
    requireGuest(
      query?.redirect ? decodeURIComponent(query?.redirect) : undefined
    );
  }, [requireGuest, query?.redirect]);

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [tempOtp, setTempOtp] = useState("");

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/mobile", {
        mobile,
      });

      setTempOtp(response.data.tempOtp || "4444"); // For testing, show the temp OTP
      setStep("otp");
    } catch (error: any) {
      setError(
        error?.response?.data?.message || dict.common.failed_to_send_otp
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await dispatch(
        loginHandler({
          mobile,
          code: otp,
        })
      );

      //@ts-ignore
      if (result?.payload?.tokens?.accessToken)
        //@ts-ignore
        storeUserToken(result?.payload?.tokens?.accessToken);

      if (loginHandler.fulfilled.match(result)) {
        const redirect = query.redirect;

        if (redirect) {
          router.push(decodeURIComponent(redirect));
        } else {
          router.push(getLinkWithLocale("/", currentLocale));
        }
      } else {
        setError(
          (result.payload as any)?.message || dict.common.invalid_otp_code
        );
      }
    } catch (error) {
      setError(dict.common.network_error_try_again);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp("");
    setError("");
  };

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
                {step === "phone"
                  ? dict.common.auth_sign_in_title
                  : dict.common.enter_verification_code}
              </h2>
              {step === "otp" && (
                <p className='mt-2 text-sm text-gray-600'>
                  {dict.common.we_have_sent_a_code_to} {mobile}
                </p>
              )}
            </div>
          </div>

          <div className='mt-10'>
            {step === "phone" ? (
              <form onSubmit={handleRequestOTP} className='space-y-6'>
                <div>
                  <label
                    htmlFor='mobile'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    {dict.common.phone_number}
                  </label>
                  <div className='mt-2'>
                    <input
                      id='mobile'
                      name='mobile'
                      type='tel'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder='09123456789'
                      required
                      className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    />
                  </div>
                </div>

                {error && <div className='text-red-600 text-sm'>{error}</div>}

                <button
                  type='submit'
                  disabled={isLoading || !mobile}
                  className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      {dict.common.sending}
                    </>
                  ) : (
                    dict.common.continue
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className='space-y-6'>
                <div>
                  <label
                    htmlFor='otp'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    {dict.common.verification_code}
                  </label>
                  <div className='mt-2'>
                    <input
                      id='otp'
                      name='otp'
                      type='text'
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder={dict.common.enter_4_digit_code}
                      maxLength={4}
                      required
                      className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 text-center tracking-widest'
                    />
                  </div>
                </div>

                {error && <div className='text-red-600 text-sm'>{error}</div>}

                <div className='space-y-3'>
                  <button
                    type='submit'
                    disabled={isLoading || !otp || otp.length !== 4}
                    className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        {dict.common.verifying}
                      </>
                    ) : (
                      dict.common.verify_code
                    )}
                  </button>

                  <button
                    type='button'
                    onClick={handleBackToPhone}
                    className='flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
                  >
                    {dict.common.back_to_phone_number}
                  </button>
                </div>
              </form>
            )}
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
