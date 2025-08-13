"use client";

import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import { CheckoutFormValues } from "../index";
import { useCart } from "@/hooks/use-cart";

export default function AutoShippingCalculator() {
  const { calculateShippingAsync } = useCart();
  const { values } = useFormikContext<CheckoutFormValues>();
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // Debounce to avoid excessive requests while typing
    timerRef.current = setTimeout(() => {
      const hasRequired =
        !!values.address_line1 &&
        !!values.city &&
        !!values.region &&
        !!values.country &&
        !!values.postal_code &&
        !!values.delivery_method_id;

      if (!hasRequired) return;

      calculateShippingAsync(
        {
          address_line1: values.address_line1,
          address_line2: values.address_line2,
          city: values.city,
          country: values.country,
          region: values.region,
          postal_code: values.postal_code,
        },
        values.delivery_method_id
      );
    }, 600);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    values.address_line1,
    values.address_line2,
    values.city,
    values.country,
    values.region,
    values.postal_code,
    values.delivery_method_id,
    calculateShippingAsync,
  ]);

  return null;
}
