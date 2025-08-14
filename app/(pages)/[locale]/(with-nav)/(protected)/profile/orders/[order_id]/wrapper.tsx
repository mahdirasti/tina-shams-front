"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, UserIcon } from "lucide-react";
import axiosInstance from "@/app/lib/axios";
import { getFullAssets } from "@/app/lib/utils";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import ProfilePageWrapper from "../../components/profile-page-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";

type OrderItem = {
  piece_details: {
    id: string;
    title: string;
    thumbnail?: { fileName?: string };
    cover?: { fileName?: string };
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
  shipping_address?: {
    address_line1?: string;
    address_line2?: string;
    city?: string;
    country?: string;
    region?: string;
    postal_code?: string;
  };
};

export default function MySingleOrderWrapper() {
  const { dict, dir } = useLocale();
  const params = useParams<{ order_id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${params.order_id}`);
        const data = (res as any)?.data?.data;
        setOrder(data);
      } catch (e) {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    if (params?.order_id) load();
  }, [params?.order_id]);

  return (
    <ProfilePageWrapper
      title={dict?.common?.order_details || "Order Details"}
      description={
        dict?.common?.view_order_details || "View the details of your order."
      }
    >
      <div>
        <div className='mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {loading && (
            <div className='py-8 text-sm text-gray-500'>
              {dict?.common?.loading || "Loading..."}
            </div>
          )}
          {!loading && !order && (
            <div className='py-8 text-sm text-gray-500'>
              {dict?.common?.order_not_found || "Order not found."}
            </div>
          )}
          {!loading && !!order && (
            <div className='py-8'>
              {!!order.tracking_code && (
                <dl className='text-sm font-medium'>
                  <dt className='text-gray-900'>
                    {dict?.common?.tracking_number || "Tracking number"}
                  </dt>
                  <dd className='mt-2 text-indigo-600'>
                    {order.tracking_code}
                  </dd>
                </dl>
              )}

              {!!order.shipping_address && (
                <div className='mt-8'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    {dict?.common?.shipping_address || "Shipping address"}
                  </h3>
                  <div className='mt-2 text-sm text-gray-700'>
                    {(order.shipping_address.address_line1 ||
                      order.shipping_address.address_line2) && (
                      <div>
                        {order.shipping_address.address_line1}
                        {order.shipping_address.address_line2
                          ? `, ${order.shipping_address.address_line2}`
                          : ""}
                      </div>
                    )}
                    {(order.shipping_address.city ||
                      order.shipping_address.region ||
                      order.shipping_address.postal_code) && (
                      <div>
                        {order.shipping_address.city}
                        {order.shipping_address.city &&
                        order.shipping_address.region
                          ? ", "
                          : ""}
                        {order.shipping_address.region}
                        {(order.shipping_address.city ||
                          order.shipping_address.region) &&
                        order.shipping_address.postal_code
                          ? ", "
                          : ""}
                        {order.shipping_address.postal_code}
                      </div>
                    )}
                    {order.shipping_address.country && (
                      <div>{order.shipping_address.country}</div>
                    )}
                  </div>
                </div>
              )}

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
                        <h3 className='text-gray-900'>
                          {item.piece_details?.title}
                        </h3>
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
                    {order.pricing.subtotal.toLocaleString()}{" "}
                    {order.pricing.currency}
                  </dd>
                </div>

                <div className='flex justify-between'>
                  <dt>{dict?.common?.shipping || "Shipping"}</dt>
                  <dd className='text-gray-900'>
                    {order.pricing.shipping_cost.toLocaleString()}{" "}
                    {order.pricing.currency}
                  </dd>
                </div>

                <div className='flex justify-between'>
                  <dt>{dict?.common?.taxes || "Taxes"}</dt>
                  <dd className='text-gray-900'>
                    {order.pricing.tax_amount.toLocaleString()}{" "}
                    {order.pricing.currency}
                  </dd>
                </div>

                <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
                  <dt className='text-base'>
                    {dict?.common?.total || "Total"}
                  </dt>
                  <dd className='text-base'>
                    {order.pricing.total_amount.toLocaleString()}{" "}
                    {order.pricing.currency}
                  </dd>
                </div>
              </dl>

              <div className='mt-10  gap-4 max-w-full'>
                <Button
                  className={buttonVariants({
                    class: "gap-x-2 text-primary px-4",
                    variant: "outlined",
                  })}
                  onClick={() => router.back()}
                >
                  <span>
                    {dir === "rtl" ? (
                      <ArrowRightIcon size={20} />
                    ) : (
                      <ArrowLeftIcon size={20} />
                    )}
                  </span>
                  {dict?.common?.back_to_my_orders}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProfilePageWrapper>
  );
}
