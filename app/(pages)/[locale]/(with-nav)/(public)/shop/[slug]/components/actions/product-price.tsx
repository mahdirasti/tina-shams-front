import { useMemo } from "react";
import { useApi } from "@/app/hooks";
import { PieceType } from "@/types/piece";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { cn } from "@/app/lib/utils";

type VariantType = {
  id: string;
  attributeValues?: { attributeId: string; value: string }[];
  price?: number;
  weight?: number;
  construction?: any;
};

type Props = {
  item?: PieceType;
  variants?: VariantType[];
  selectedOptions?: Record<string, string>;
  className?: string;
};

export default function ProductPrice({
  item,
  variants,
  selectedOptions,
  className,
}: Props) {
  const { dict } = useLocale();
  const { data } = useApi(`/setting/keys/gold_price`);
  const goldPrice = data !== undefined ? data?.data?.value : null;

  const computedPrice = useMemo(() => {
    // Helper: compute price from goldPrice, weight, construction percent and accessories
    const computeFromWeight = (
      weight: number | string | undefined,
      construction: any,
      accessoriesCandidate?: number
    ) => {
      const w = parseFloat(String(weight ?? "0"));
      if (!goldPrice || !w || Number.isNaN(w) || goldPrice <= 0) return null;
      const constructionPercent =
        construction?.construction_fee_percent ??
        construction?.fee_percent ??
        construction ??
        0;
      const accessories =
        accessoriesCandidate ?? construction?.accessories_fee ?? 0;
      const goldValue = goldPrice * w;
      const constructionValue = Math.round(
        (goldValue * Number(constructionPercent || 0)) / 100
      );
      const unitPrice = Math.round(
        goldValue + constructionValue + Number(accessories || 0)
      );

      return unitPrice;
    };

    // 1) Try to find matching variant
    try {
      if (variants && variants.length > 0 && selectedOptions) {
        const match = variants.find((v) => {
          if (!Array.isArray(v.attributeValues)) return false;
          return v.attributeValues.every(
            (av) =>
              String(selectedOptions[String(av.attributeId)]) ===
              String(av.value)
          );
        });
        if (match) {
          // prefer explicit variant price
          if (match.price != null) return match.price;
          // compute from variant weight/construction/accessories if possible
          const fromVariant = computeFromWeight(
            match.weight,
            match.construction,
            (match as any).accessories_fee
          );
          if (fromVariant != null) return fromVariant;
        }
      }
    } catch (e) {
      // ignore
    }

    // 2) Fallback to item base price
    const base = (item as any)?.price;
    if (base != null) return base;

    // 3) Estimate using gold price and item weight if available
    try {
      const fromItem = computeFromWeight(
        (item as any)?.weight,
        (item as any)?.construction,
        (item as any)?.accessories_fee
      );
      if (fromItem != null) return fromItem;
    } catch (e) {
      // ignore
    }

    return null;
  }, [item, variants, selectedOptions, goldPrice]);

  if (computedPrice == null) {
    return (
      <div className='mt-6 text-right text-sm text-gray-600'>
        {dict.common.contact_for_price}
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <div className='text-lg font-semibold text-gray-900'>
        {computedPrice.toLocaleString()}{" "}
        {dict.common.rial || dict.common.currency || ""}
      </div>
    </div>
  );
}
