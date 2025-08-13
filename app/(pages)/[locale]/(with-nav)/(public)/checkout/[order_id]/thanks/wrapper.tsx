"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/app/lib/axios";
import { MainContainer } from "@/components/containers";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { getFullAssets } from "@/app/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { FileType } from "@/types/file";
import { CategoryType } from "@/types/category";
import { ArrowLeftIcon, UserIcon } from "lucide-react";

type OrderItem = {
  piece_details: {
    id: string;
    title: string;
    weight: string;
    thumbnail: FileType;
    cover: FileType;
    categories: CategoryType[];
  };
  quantity: number;
  price?: number;
};

type Order = {
  order_id: string;
  tracking_code?: string;
  status: string;
  items: OrderItem[];
  pricing: {
    subtotal: number;
    shipping_cost: number;
    tax_amount: number;
    total_amount: number;
    currency: string;
  };
  shipping_address?: any;
};

export default function CheckoutThanksWrapper() {
  const { dict, locale } = useLocale();
  const params = useParams<{ order_id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { clearCartSync, clearCartAsync } = useCart();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${params.order_id}`);
        const data = (res as any)?.data?.data;
        setOrder(data);
      } catch (e) {
        // if fails, go home
        router.push(`/${locale}`);
      } finally {
        setLoading(false);
      }
    };
    if (params?.order_id) load();
  }, [params?.order_id, router, locale]);

  // Clear cart as soon as thanks page opens
  useEffect(() => {
    // Clear persisted cart immediately; fire-and-forget server clear
    clearCartSync();
    try {
      clearCartAsync();
    } catch (e) {}
  }, [clearCartSync, clearCartAsync]);

  if (loading) return null;
  if (!order) return null;

  return (
    <MainContainer>
      <div className='py-16 lg:py-24'>
        <div className='max-w-3xl'>
          <h1 className='text-sm font-medium text-green-600'>
            {dict?.checkout?.payment_successful || "Payment successful"}
          </h1>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            {dict?.checkout?.thanks_for_ordering || "Thanks for ordering"}
          </p>
          {!!order.tracking_code && (
            <dl className='mt-6 text-sm font-medium'>
              <dt className='text-gray-900'>
                {dict?.checkout?.tracking_number || "Tracking number"}
              </dt>
              <dd className='mt-2 text-indigo-600'>{order.tracking_code}</dd>
            </dl>
          )}
        </div>

        <ul
          role='list'
          className='mt-8 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'
        >
          {order.items.map((item, idx) => {
            const fileName =
              item.piece_details?.thumbnail?.fileName ||
              item.piece_details?.cover?.fileName;
            return (
              <li key={idx} className='flex gap-6 py-6'>
                <Image
                  alt={item.piece_details?.title ?? "Piece"}
                  src={
                    fileName
                      ? getFullAssets(fileName)
                      : "/assets/images/product-cover-2.jpg"
                  }
                  className='size-24 flex-none rounded-md bg-gray-100 object-cover object-center'
                  width={96}
                  height={96}
                />
                <div className='flex-auto space-y-1'>
                  <h3 className='text-gray-900'>{item.piece_details?.title}</h3>
                  <p>
                    {dict?.common?.qty || "Qty"}: {item.quantity}
                  </p>
                </div>
                <p className='flex-none font-medium text-gray-900'>
                  {item.price?.toLocaleString?.()}
                </p>
              </li>
            );
          })}
        </ul>

        <dl className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500'>
          <div className='flex justify-between'>
            <dt>{dict?.common?.subtotal || "Subtotal"}</dt>
            <dd className='text-gray-900'>
              {order.pricing.subtotal.toLocaleString()} {order.pricing.currency}
            </dd>
          </div>

          <div className='flex justify-between'>
            <dt>{dict?.checkout?.shipping || "Shipping"}</dt>
            <dd className='text-gray-900'>
              {order.pricing.shipping_cost.toLocaleString()}{" "}
              {order.pricing.currency}
            </dd>
          </div>

          <div className='flex justify-between'>
            <dt>{dict?.checkout?.taxes || "Taxes"}</dt>
            <dd className='text-gray-900'>
              {order.pricing.tax_amount.toLocaleString()}{" "}
              {order.pricing.currency}
            </dd>
          </div>

          <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
            <dt className='text-base'>{dict?.checkout?.total || "Total"}</dt>
            <dd className='text-base'>
              {order.pricing.total_amount.toLocaleString()}{" "}
              {order.pricing.currency}
            </dd>
          </div>
        </dl>

        <div className='mt-10 grid grid-cols-2 gap-4 w-[300px] max-w-full'>
          <Link
            className={buttonVariants({
              class: "gap-x-2",
              variant: "outlined",
            })}
            href={`/${locale}`}
          >
            <ArrowLeftIcon className='size-4' />
            {dict?.common?.back_to_home}
          </Link>
          <Link
            className={buttonVariants({
              class: "gap-x-2",
            })}
            href={`/${locale}/profile`}
          >
            <UserIcon className='size-4' />
            {dict?.common?.go_to_profile}
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
