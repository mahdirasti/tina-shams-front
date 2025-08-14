"use client";

import { useEffect, useMemo, useState } from "react";
import { MainContainer } from "@/components/containers";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  ContactInformation,
  ShippingInformation,
  DeliveryMethod,
  PaymentMethods,
  OrderSummary,
  AutoShippingCalculator,
} from "./components";
import Logo from "@/components/shared/logo";
import Link from "next/link";
import { getLinkWithLocale } from "@/app/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import axiosInstance from "@/app/lib/axios";
import { useRouter } from "next/navigation";

export type CheckoutFormValues = {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  company?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  country: string;
  region: string;
  postal_code: string;
  delivery_method_id: string;
  payment_method_id: string;
};

export type DeliveryMethodType = {
  id: string;
  title: string;
  turnaround: string;
  price: number; // in minor or major currency unit according to cart currency
};

export type PaymentMethodType = {
  id: string;
  title: string;
};

// Methods are derived from translations

// Validation schema will be built inside the component to access translations

export default function CheckoutWrapper() {
  const { locale, dict } = useLocale();
  const DELIVERY_METHODS = useMemo<DeliveryMethodType[]>(
    () => [
      {
        id: "standard",
        title: dict?.common?.standard || "Standard",
        turnaround: dict?.common?.business_days_4_10 || "4–10 business days",
        price: 50000,
      },
      {
        id: "express",
        title: dict?.common?.express || "Express",
        turnaround: dict?.common?.business_days_2_5 || "2–5 business days",
        price: 160000,
      },
    ],
    [dict]
  );

  const PAYMENT_METHODS = useMemo<PaymentMethodType[]>(
    () => [
      { id: "credit-card", title: dict?.common?.credit_card || "Credit card" },
      {
        id: "cod",
        title: dict?.common?.cash_on_delivery || "Cash on delivery",
      },
    ],
    [dict]
  );
  const { user } = useAuth();
  const cartHook = useCart();
  const router = useRouter();
  type ShippingAddress = {
    _id: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    country: string;
    region: string;
    postal_code: string;
    is_default?: boolean;
  };
  const [defaultAddress, setDefaultAddress] = useState<ShippingAddress | null>(
    null
  );

  useEffect(() => {
    const loadDefaultAddress = async () => {
      try {
        const res = await axiosInstance.get("/users/me/shipping-addresses");
        const list = ((res as any)?.data?.data || []) as ShippingAddress[];
        const def = list.find((a) => a.is_default) || list[0] || null;
        setDefaultAddress(def);
      } catch (e) {
        setDefaultAddress(null);
      }
    };
    loadDefaultAddress();
  }, [user?.id]);

  const initialValues: CheckoutFormValues = useMemo(
    () => ({
      email: user?.email || "",
      first_name: user?.name || "",
      last_name: user?.surename || "",
      phone: user?.mobile || "",
      company: "",
      address_line1: defaultAddress?.address_line1 || "",
      address_line2: defaultAddress?.address_line2 || "",
      city: defaultAddress?.city || "",
      country: defaultAddress?.country || "IR",
      region: defaultAddress?.region || "",
      postal_code: defaultAddress?.postal_code || "",
      delivery_method_id: DELIVERY_METHODS[0]?.id || "standard",
      payment_method_id: PAYMENT_METHODS[0]?.id || "credit-card",
    }),
    [user, defaultAddress, DELIVERY_METHODS, PAYMENT_METHODS]
  );

  let content = (
    <MainContainer>
      <h2 className='sr-only'>{dict.common.checkout}</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email(dict.common.invalid_email)
            .required(dict.common.required),
          first_name: Yup.string().required(dict.common.required),
          last_name: Yup.string().required(dict.common.required),
          phone: Yup.string().required(dict.common.required),
          address_line1: Yup.string().required(dict.common.required),
          city: Yup.string().required(dict.common.required),
          country: Yup.string().required(dict.common.required),
          region: Yup.string().required(dict.common.required),
          postal_code: Yup.string().required(dict.common.required),
          delivery_method_id: Yup.string().required(dict.common.required),
          payment_method_id: Yup.string().required(dict.common.required),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const payload = {
              customer: {
                user_id: user?.id || null,
                email: values.email,
                mobile: values.phone,
                first_name: values.first_name,
                last_name: values.last_name,
                company: values.company || undefined,
              },
              shipping_address: {
                address_line1: values.address_line1,
                address_line2: values.address_line2 || undefined,
                city: values.city,
                country: values.country,
                region: values.region,
                postal_code: values.postal_code,
              },
              shipping_method: {
                id: values.delivery_method_id,
              },
              payment: {
                method: values.payment_method_id,
              },
              items: cartHook.items.map((i) => ({
                cart_item_id: i.id,
                piece_id: i.piece.id,
                quantity: i.quantity,
                selected_options: i.selected_options || {},
              })),
              pricing: {
                currency: cartHook.currency,
                subtotal: cartHook.subtotal,
                shipping_cost: cartHook.shipping_cost,
                tax_amount: cartHook.tax_amount,
                discount_amount: cartHook.discount_amount,
                total_amount: cartHook.total_amount,
              },
            };

            const res = await axiosInstance.post("/orders/checkout", payload);
            const data = (res as any)?.data?.data || {};
            const orderId = data?.order_id;

            // For now, skip external payment redirects and always go to thanks page
            if (orderId) {
              // Empty cart immediately in Redux (persisted)
              // cartHook.clearCartSync();
              // // Optionally notify backend (non-blocking)
              // try {
              //   cartHook.clearCartAsync();
              // } catch (e) {}
              router.push(`/${locale}/checkout/${orderId}/thanks`);
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'>
            <div>
              <AutoShippingCalculator />
              <ContactInformation />
              <div className='mt-10 border-t border-gray-200 pt-10'>
                <ShippingInformation />
              </div>
              <div className='mt-10 border-t border-gray-200 pt-10'>
                <DeliveryMethod deliveryMethods={DELIVERY_METHODS} />
              </div>
              <div className='mt-10 border-t border-gray-200 pt-10'>
                <PaymentMethods paymentMethods={PAYMENT_METHODS} />
              </div>
            </div>

            <OrderSummary isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </MainContainer>
  );

  if (cartHook.items.length === 0) {
    content = (
      <MainContainer>
        <div className='flex flex-col gap-y-6 items-center justify-center h-full min-h-[500px]'>
          <Logo />
          <h2 className='text-2xl font-bold'>{dict.common.no_items_in_cart}</h2>
          <p className='text-gray-500 text-center'>
            {dict.common.add_items_to_cart_to_continue}
          </p>
          <Link
            className={buttonVariants()}
            href={getLinkWithLocale(`/shop`, locale)}
          >
            {dict.common.continue_shopping}
          </Link>
        </div>
      </MainContainer>
    );
  }

  return <div className='bg-gray-50 py-24'>{content}</div>;
}
