import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import ODialog from "@/components/shared-ui/o-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

export default function CalculatePrice() {
  const { dict, dir } = useLocale();

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
          <div dir={dir} className='space-y-4'>
            <p>{dict.common.calculate_price_method_desc}</p>
            <Button onClick={close}>{dict.common.close}</Button>
          </div>
        )}
      </ODialog>
    </>
  );
}
