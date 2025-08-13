"use client";

import { useMemo } from "react";
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

const DELIVERY_METHODS: DeliveryMethodType[] = [
  {
    id: "standard",
    title: "Standard",
    turnaround: "4–10 business days",
    price: 50000,
  },
  {
    id: "express",
    title: "Express",
    turnaround: "2–5 business days",
    price: 160000,
  },
];

const PAYMENT_METHODS: PaymentMethodType[] = [
  { id: "credit-card", title: "Credit card" },
  { id: "cod", title: "Cash on delivery" },
];

const CheckoutValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  address_line1: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  region: Yup.string().required("Required"),
  postal_code: Yup.string().required("Required"),
  delivery_method_id: Yup.string().required("Required"),
  payment_method_id: Yup.string().required("Required"),
});

export default function CheckoutWrapper() {
  const { locale } = useLocale();
  const { user } = useAuth();
  const cartHook = useCart();
  const router = useRouter();

  const initialValues: CheckoutFormValues = useMemo(
    () => ({
      email: user?.email || "",
      first_name: user?.name || "",
      last_name: user?.surename || "",
      phone: user?.mobile || "",
      company: "",
      address_line1: "",
      address_line2: "",
      city: "",
      country: "IR",
      region: "",
      postal_code: "",
      delivery_method_id: DELIVERY_METHODS[0]?.id || "standard",
      payment_method_id: PAYMENT_METHODS[0]?.id || "credit-card",
    }),
    [user]
  );

  let content = (
    <MainContainer>
      <h2 className='sr-only'>Checkout</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={CheckoutValidationSchema}
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
              cartHook.clearCartSync();
              // Optionally notify backend (non-blocking)
              try {
                cartHook.clearCartAsync();
              } catch (e) {}
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
          <h2 className='text-2xl font-bold'>No items in cart</h2>
          <p className='text-gray-500 text-center'>
            Please add some items to your cart to continue.
          </p>
          <Link
            className={buttonVariants()}
            href={getLinkWithLocale(`/shop`, locale)}
          >
            Continue shopping
          </Link>
        </div>
      </MainContainer>
    );
  }

  return <div className='bg-gray-50 py-24'>{content}</div>;
}
