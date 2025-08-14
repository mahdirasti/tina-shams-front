"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CheckCircleIcon,
  ClockIcon,
  EllipsisVerticalIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import ProfilePageWrapper from "../components/profile-page-wrapper";
import axiosInstance from "@/app/lib/axios";
import { useEffect, useMemo, useState } from "react";
import { getFullAssets } from "@/app/lib/utils";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { FileType } from "@/types/file";
import { CategoryType } from "@/types/category";

type Order = {
  user: string;
  customer: {
    user_id: "689cf90184ff05513f99c004";
    email: "mahdirasti.dev@gmail.com";
    mobile: "09393982868";
    first_name: "Mahdi";
    last_name: "Rasti";
    company: "GBK";
  };
  shipping_address: {
    address_line1: string;
    city: string;
    country: string;
    region: string;
    postal_code: string;
  };
  shipping_method: {
    id: string;
  };
  payment: {
    method: string;
  };
  items: {
    cart_item_id: string;
    piece_id: string;
    quantity: number;
    piece_details?: {
      id: string;
      title: string;
      weight: string;
      thumbnail: FileType;
      cover: FileType;
      categories: CategoryType[];
    };
    price?: number;
  }[];
  pricing: {
    currency: string;
    subtotal: number;
    shipping_cost: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
  };
  tracking_code: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export default function MyOrdersWrapper() {
  const { locale, dict } = useLocale();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(`/orders/my`, {
          params: { page: 1, limit: 20 },
        });
        const data = (res as any)?.data?.data;
        const items: Order[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : [];
        setOrders(items);
      } catch (e) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formattedOrders = useMemo(() => {
    return orders.map((order) => {
      const createdDate = order.createdAt
        ? new Date(order.createdAt)
        : undefined;
      const deliveredDate = order.updatedAt
        ? new Date(order.updatedAt)
        : undefined;
      return {
        id: order.tracking_code,
        href: `/${locale}/profile/orders/${order.id}`,
        invoiceHref: "#",
        createdDateLabel: createdDate?.toLocaleDateString?.() || "-",
        createdDatetime: order.createdAt || "",
        deliveredDateLabel: deliveredDate?.toLocaleDateString?.() || "-",
        deliveredDatetime: order.updatedAt || "",
        totalLabel: order.pricing?.total_amount
          ? `${order.pricing.total_amount.toLocaleString()} ${
              order.pricing.currency || ""
            }`
          : "-",
        items: order.items || [],
        status: order.status || "",
      };
    });
  }, [orders, locale]);

  return (
    <ProfilePageWrapper
      title={dict?.common?.my_orders || "My Orders"}
      description={
        dict?.common?.my_orders_desc ||
        "List of your recent orders will appear here."
      }
    >
      <div className='mt-8'>
        <h2 className='sr-only'>
          {dict?.common?.recent_orders || "Recent orders"}
        </h2>
        <div className='mx-auto'>
          <div className='mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
            {!loading && formattedOrders.length === 0 && (
              <div className='text-sm text-gray-500'>
                {dict?.common?.no_orders_yet || "No orders yet."}
              </div>
            )}
            {formattedOrders.map((order) => (
              <div
                key={order.id}
                className='border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border'
              >
                <h3 className='sr-only'>
                  {dict?.common?.order_placed_on || "Order placed on"}{" "}
                  <time dateTime={order.createdDatetime}>
                    {order.createdDateLabel}
                  </time>
                </h3>

                <div className='flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6'>
                  <dl className='grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
                    <div>
                      <dt className='font-medium text-gray-900'>
                        {dict?.common?.order_number || "Order number"}
                      </dt>
                      <dd className='mt-1 text-gray-500'>{order.id}</dd>
                    </div>
                    <div className='hidden sm:block'>
                      <dt className='font-medium text-gray-900'>
                        {dict?.common?.date_placed || "Date placed"}
                      </dt>
                      <dd className='mt-1 text-gray-500'>
                        <time dateTime={order.createdDatetime}>
                          {order.createdDateLabel}
                        </time>
                      </dd>
                    </div>
                    <div>
                      <dt className='font-medium text-gray-900'>
                        {dict?.common?.total_amount || "Total amount"}
                      </dt>
                      <dd className='mt-1 font-medium text-gray-900'>
                        {order.totalLabel}
                      </dd>
                    </div>
                  </dl>

                  <Menu
                    as='div'
                    className='relative flex justify-end lg:hidden'
                  >
                    <div className='flex items-center'>
                      <MenuButton className='-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500'>
                        <span className='sr-only'>
                          {`${
                            dict?.common?.options_for_order ||
                            "Options for order"
                          } ${order.id}`}
                        </span>
                        <EllipsisVerticalIcon
                          aria-hidden='true'
                          className='size-6'
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className='absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                    >
                      <div className='py-1'>
                        <MenuItem>
                          <Link
                            href={order.href}
                            className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
                          >
                            {dict?.common?.view || "View"}
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href={order.invoiceHref}
                            className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
                          >
                            {dict?.common?.invoice || "Invoice"}
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>

                  <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
                    <Link
                      href={order.href}
                      className='flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                    >
                      <span>{dict?.common?.view_order || "View Order"}</span>
                      <span className='sr-only'>{order.id}</span>
                    </Link>
                  </div>
                </div>

                <h4 className='sr-only'>{dict?.common?.items || "Items"}</h4>
                <ul role='list' className='divide-y divide-gray-200'>
                  {order.items.map((product, idx) => {
                    const fileName =
                      product.piece_details?.thumbnail?.fileName ||
                      product.piece_details?.cover?.fileName;

                    let statusIcon = null;
                    switch (order.status) {
                      // "pending", "paid", "failed", "delivered", "refunded"
                      case "pending":
                        statusIcon = (
                          <ClockIcon className='size-5 text-gray-500' />
                        );
                        break;
                      case "delivered":
                        statusIcon = (
                          <CheckCircleIcon className='size-5 text-green-500' />
                        );
                        break;
                      case "failed":
                        statusIcon = (
                          <XCircleIcon className='size-5 text-red-500' />
                        );
                        break;
                      case "paid":
                        statusIcon = (
                          <CheckCircleIcon className='size-5 text-green-500' />
                        );
                        break;
                      case "refunded":
                        statusIcon = (
                          <XCircleIcon className='size-5 text-red-500' />
                        );
                        break;
                    }

                    return (
                      <li key={idx} className='p-4 sm:p-6'>
                        <div className='flex items-center sm:items-start gap-6'>
                          <div className='size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40'>
                            <img
                              alt={product.piece_details?.title || "Item"}
                              src={
                                fileName
                                  ? getFullAssets(fileName)
                                  : "/assets/images/product-cover-2.jpg"
                              }
                              className='size-full object-cover'
                            />
                          </div>
                          <div className='flex-1 text-sm'>
                            <div className='font-medium text-gray-900 sm:flex sm:justify-between'>
                              <h5>
                                {product.piece_details?.title ||
                                  dict?.common?.item ||
                                  "Item"}
                              </h5>
                              <p className='mt-2 sm:mt-0'>
                                {product.price?.toLocaleString?.() || ""}
                              </p>
                            </div>
                            {!!product.quantity && (
                              <p className='hidden text-gray-500 sm:mt-2 sm:block'>
                                {dict?.common?.qty || "Qty"}: {product.quantity}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className='mt-6 sm:flex sm:justify-between'>
                          <div className='flex items-center gap-2'>
                            {statusIcon}
                            <p className='text-sm font-medium text-gray-500'>
                              {order.status === "delivered" ? (
                                <span>
                                  {dict?.common?.delivered_on || "Delivered on"}{" "}
                                  <time dateTime={order.deliveredDatetime}>
                                    {order.deliveredDateLabel}
                                  </time>
                                </span>
                              ) : (
                                <span>
                                  {dict?.common?.status || "Status"}:{" "}
                                  {dict?.common?.[order.status] || order.status}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfilePageWrapper>
  );
}
