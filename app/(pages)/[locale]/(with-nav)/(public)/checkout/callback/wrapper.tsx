"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { getLinkWithLocale } from "@/app/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import axiosInstance from "@/app/lib/axios";
import { useRouter } from "next/navigation";

type Props = {
  authority: string;
  status: string;
};

export default function CheckoutCallbackWrapper({ authority, status }: Props) {
  const { dict, locale } = useLocale();
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (status !== "OK") {
    return (
      <div className='flex flex-col gap-y-6 items-center justify-center  min-h-[500px]'>
        <div className='flex flex-col gap-y-2 text-red-500'>
          <XCircle size={48} />
        </div>
        <div className='flex flex-col gap-y-2 items-center justify-center'>
          <h1 className='text-2xl font-bold'>{dict.common.error}</h1>
          <p className='text-sm text-gray-500'>{dict.common.error_desc}</p>
        </div>
        <Link
          className={buttonVariants({
            variant: "outlined",
          })}
          href={getLinkWithLocale("/checkout", locale)}
        >
          {dict.common.back_to_checkout}
        </Link>
      </div>
    );
  }
  // When status is OK, attempt server-side verification using Authority
  useEffect(() => {
    let mounted = true;
    const verify = async () => {
      setVerifying(true);
      setErrorMsg(null);
      try {
        const res = await axiosInstance.get(`/transactions/verify`, {
          params: {
            gateway: "zarinpal",
            Authority: authority,
            Status: status,
          },
        });
        const v = (res as any)?.data?.data || {};

        // Try to obtain order id from several possible response shapes
        const orderId =
          // If server returns an `order` object
          v?.order?.order_id ||
          v?.order?._id ||
          v?.order?.id ||
          // If server returns nested verify data
          v?.verify?.data?.order_id ||
          v?.verify?.data?._id ||
          // Older/other shapes
          v?.order_id ||
          v?.metadata?.order_id ||
          v?.data?.order_id;

        if (orderId && mounted) {
          router.push(`/${locale}/checkout/${orderId}/thanks`);
          return;
        }

        // Zarinpal success code is 100 (or 101 for already verified)
        const code =
          v?.verify?.data?.code ||
          v?.verify?.data?.Status ||
          v?.code ||
          v?.Status ||
          v?.status;
        if (
          (code === 100 || code === "100" || code === 101 || code === "101") &&
          mounted
        ) {
          // Verification reports success but no order id available — show success UI
          setVerifying(false);
          return;
        }

        setErrorMsg(
          dict?.checkout?.payment_verification_failed ||
            "Payment verification failed."
        );
      } catch (e) {
        setErrorMsg(
          dict?.common?.network_error_try_again ||
            "Network error, please try again."
        );
      } finally {
        if (mounted) setVerifying(false);
      }
    };

    setTimeout(() => {
      verify();
    }, 3000);

    return () => {
      mounted = false;
    };
  }, [authority, status, router, locale, dict]);

  return (
    <div className='flex flex-col gap-y-6 items-center justify-center min-h-[500px]'>
      <div className='flex flex-col gap-y-2 text-green-500'>
        <CheckCircle2 size={48} />
      </div>
      <div className='flex flex-col gap-y-2 items-center justify-center'>
        <h1 className='text-2xl font-bold'>
          {dict.common.your_payment_was_successful}
        </h1>
        <p className='text-sm text-gray-500'>
          {verifying
            ? dict?.checkout?.verifying_payment || "Verifying payment..."
            : dict.common.your_payment_was_successful_desc}
        </p>
        {errorMsg && <p className='text-sm text-red-500'>{errorMsg}</p>}
      </div>
    </div>
  );
}
