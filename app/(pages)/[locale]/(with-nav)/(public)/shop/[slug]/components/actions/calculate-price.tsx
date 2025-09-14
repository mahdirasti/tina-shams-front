import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import ODialog from "@/components/shared-ui/o-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

export default function CalculatePrice() {
  const { dict } = useLocale();

  return (
    <>
      <ODialog
        trigger={(open) => (
          <Button variant='text' onClick={open}>
            {dict.common.calculate_price_method}
          </Button>
        )}
      >
        {(close) => (
          <div dir='rtl' className='space-y-4'>
            <p>وزن طلا x ( قیمت روز طلا +‌اجرت ) +‌ ۷ درصد سود +‌ متعلقات</p>
            <Button onClick={close}>{dict.common.close}</Button>
          </div>
        )}
      </ODialog>
    </>
  );
}
