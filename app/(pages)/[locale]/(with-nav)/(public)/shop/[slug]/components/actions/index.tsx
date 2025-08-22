"use client";

import { useEffect, useMemo, useState } from "react";
import { PieceType } from "@/types/piece";
import { useAuth, useCart } from "@/app/hooks";
import { OrgIconButton } from "@/components/shared-ui";
import { Heart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { useRouter } from "next/navigation";
import { getLinkWithLocale, urlWithQueryParams } from "@/app/lib/utils";
import axiosInstance from "@/app/lib/axios";
import ColorPicker from "../color-picker";
import SizePicker from "../size-picker";
import ProductPrice from "./product-price";

type Props = {
  item: PieceType;
};

export default function ProductActions({ item }: Props) {
  const { dict, locale } = useLocale();

  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const { addItemToCartAsync, isItemInCart, getItemQuantity } = useCart();

  const isInCart = isItemInCart(item.id);
  const cartQuantity = getItemQuantity(item.id);

  // Variant/Attributes state
  type VariantType = {
    id: string;
    attributeValues?: { attributeId: string; value: string }[];
    price?: number;
    stock?: number;
  };
  type AttributeOption = { label?: string; value: string; meta?: any };
  type AttributeDef = {
    id: string;
    name: string;
    inputType:
      | "TEXT"
      | "NUMBER"
      | "SELECT"
      | "MULTISELECT"
      | "COLOR"
      | "SIZE"
      | string;
    isVariant?: boolean;
    options?: AttributeOption[];
  };

  const [variants, setVariants] = useState<VariantType[]>([]);
  const [attributes, setAttributes] = useState<AttributeDef[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [isLoadingVariants, setIsLoadingVariants] = useState(false);

  // Load variants and attribute definitions based on product and categories
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoadingVariants(true);
      try {
        // 1) Normalize variants from provided item prop
        const rawVariants: any[] = Array.isArray((item as any)?.variants)
          ? (item as any).variants
          : [];
        const list: VariantType[] = rawVariants.map((v: any) => ({
          id: v._id || v.id,
          attributeValues: Array.isArray(v.attributeValues)
            ? v.attributeValues.map((av: any) => ({
                attributeId:
                  typeof av.attribute === "string"
                    ? av.attribute
                    : av.attribute?._id || av.attribute?.id,
                value: String(av.value),
              }))
            : [],
          price: v.price,
          stock: v.stock,
          weight: v.weight,
          construction: v.construction_fee_percent,
        }));
        if (mounted) setVariants(list);

        // 2) Fetch category attributes, then keep only those used by variants
        const variantAttributeIds = Array.from(
          new Set(
            list.flatMap((v) =>
              (v.attributeValues || []).map((av) => String(av.attributeId))
            )
          )
        );

        const categoryIds = Array.isArray(item.categories)
          ? item.categories.map((c: any) => c.id || c._id).filter(Boolean)
          : [];
        const attrResults = await Promise.all(
          categoryIds.map(async (cid) => {
            try {
              const r = await axiosInstance.get(`/category/${cid}`, {
                headers: { lang: locale },
              });
              return (r as any)?.data?.data?.attributes ?? [];
            } catch (e) {
              return [];
            }
          })
        );

        const merged: AttributeDef[] = [];
        const seen = new Set<string>();
        for (const arr of attrResults) {
          for (const a of arr) {
            if (!a) continue;
            const id = a.id || a._id;
            if (!id || seen.has(id)) continue;
            seen.add(id);
            merged.push({
              id,
              name: a.name,
              inputType: a.inputType,
              isVariant: a.isVariant,
              options: Array.isArray(a.options) ? a.options : [],
            });
          }
        }
        const onlyVariantAttributes = merged
          .filter((a) => a.isVariant)
          .filter((a) => variantAttributeIds.includes(a.id));

        // Intersect options with values present in variants (hide unavailable)
        const availableValuesByAttr: Record<string, Set<string>> = {};
        for (const attrId of variantAttributeIds) {
          availableValuesByAttr[attrId] = new Set(
            list
              .flatMap((v) => v.attributeValues || [])
              .filter((av) => String(av.attributeId) === String(attrId))
              .map((av) => String(av.value))
          );
        }
        const filteredAttributes = onlyVariantAttributes.map((a) => ({
          ...a,
          options: (a.options || []).filter((opt) =>
            availableValuesByAttr[a.id]?.has(String(opt.value))
          ),
        }));
        if (mounted) setAttributes(filteredAttributes);

        // Initialize defaults if none selected
        if (mounted && filteredAttributes.length > 0) {
          setSelectedOptions((prev) => {
            const next = { ...prev } as Record<string, string>;
            for (const a of filteredAttributes) {
              if (!next[a.id] && a.options && a.options.length > 0) {
                next[a.id] = String(a.options[0].value);
              }
            }
            return next;
          });
        }
      } finally {
        if (mounted) setIsLoadingVariants(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [item.id, locale, item.categories]);

  // Helper: does a variant match current selections (optionally excluding one attribute)
  const variantMatchesSelection = useMemo(
    () =>
      (
        v: VariantType,
        selections: Record<string, string>,
        excludeAttrId?: string
      ) => {
        const avs = v.attributeValues || [];
        for (const [attrId, val] of Object.entries(selections)) {
          if (excludeAttrId && String(attrId) === String(excludeAttrId))
            continue;
          const found = avs.find(
            (av: any) =>
              String((av as any).attributeId) === String(attrId) &&
              String(av.value) === String(val)
          );
          if (!found) return false;
        }
        return true;
      },
    [variants]
  );

  // Compute available values for an attribute based on current selections
  const getAvailableValuesForAttribute = useMemo(
    () =>
      (attributeId: string): string[] => {
        const values = new Set<string>();
        for (const v of variants) {
          if (!variantMatchesSelection(v, selectedOptions, attributeId))
            continue;
          for (const av of v.attributeValues || []) {
            if (String((av as any).attributeId) === String(attributeId)) {
              values.add(String(av.value));
            }
          }
        }
        return Array.from(values);
      },
    [variants, selectedOptions, variantMatchesSelection]
  );

  // Ensure selected options stay valid when selections or availability change
  useEffect(() => {
    if (attributes.length === 0) return;
    let changed = false;
    const next: Record<string, string> = { ...selectedOptions };
    for (const a of attributes) {
      const avail = new Set(getAvailableValuesForAttribute(a.id));
      if (!avail.size) continue;
      if (!next[a.id] || !avail.has(String(next[a.id]))) {
        // pick first available
        const first = Array.from(avail)[0];
        if (first) {
          next[a.id] = first;
          changed = true;
        }
      }
    }
    if (changed) setSelectedOptions(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes, variants]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push(
        getLinkWithLocale(
          urlWithQueryParams(`/auth/sign-in`, {
            redirect: encodeURIComponent(
              getLinkWithLocale(`/shop/${item.slug}`, locale)
            ),
          }),
          locale
        )
      );
      toast.error(dict.common.please_sign_in_first);
      return;
    }

    // Ensure all variant attributes are selected
    if (attributes.length > 0) {
      const missing = attributes.find((a) => !selectedOptions[a.id]);
      if (missing) {
        toast.error(
          (dict as any)?.common?.please_select_required_options ||
            "Please select required options"
        );
        return;
      }
    }

    // Try to resolve a matching variant_id by comparing selections
    let variantIdToSend: string | undefined = undefined;
    if (variants.length > 0 && Object.keys(selectedOptions).length > 0) {
      const match = variants.find((v) => {
        if (!Array.isArray(v.attributeValues)) return false;
        return v.attributeValues.every(
          (av) => selectedOptions[(av as any).attributeId] === av.value
        );
      });
      if (match?.id) variantIdToSend = match.id;
    }

    setIsAddingToCart(true);
    try {
      await addItemToCartAsync({
        piece: item,
        quantity: quantity,
        selected_options: selectedOptions,
        // @ts-ignore extend thunk payload with variant_id
        variant_id: variantIdToSend,
      });
      toast.success(dict.common.added_to_cart);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error(dict.common.failed_to_add_to_cart);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Initialize wishlist state by fetching the user's wishlist (best-effort, paginated)
  useEffect(() => {
    const init = async () => {
      try {
        const res = await axiosInstance.get(`/wishlist/my`, {
          params: { page: 1, limit: 1000 },
        });
        const payload: any = (res as any)?.data ?? {};
        const data: any = payload?.data ?? payload;
        const items: PieceType[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : [];
        const exists = items.some((p) => p.id === item.id);
        setIsWishlisted(exists);
      } catch (e) {
        // ignore
      }
    };
    if (isAuthenticated) {
      init();
    } else {
      setIsWishlisted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, isAuthenticated]);

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      router.push(
        getLinkWithLocale(
          urlWithQueryParams(`/auth/sign-in`, {
            redirect: encodeURIComponent(
              getLinkWithLocale(`/shop/${item.slug}`, locale)
            ),
          }),
          locale
        )
      );
      toast.error(dict.common.please_sign_in_first);
      return;
    }

    setIsTogglingWishlist(true);
    try {
      if (isWishlisted) {
        await axiosInstance.delete(`/wishlist/my/remove/${item.id}`);
        setIsWishlisted(false);
        toast.success(dict.common.removed_from_wishlist);
      } else {
        await axiosInstance.post(`/wishlist/my/add/${item.id}`);
        setIsWishlisted(true);
        toast.success(dict.common.added_to_wishlist);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
      toast.error(dict.common.failed_to_update_wishlist);
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  // Derive color and size options from attributes
  const colorAttribute = attributes.find((a) => a.inputType === "COLOR");
  const sizeAttribute = attributes.find((a) => a.inputType === "SIZE");

  // Limit options to only available (backend variants) under current partial selection
  const colorOptions = useMemo(() => {
    if (!colorAttribute)
      return [] as { id: string; name: string; value: string }[];
    const allowed = new Set(getAvailableValuesForAttribute(colorAttribute.id));
    return (colorAttribute.options || [])
      .filter((opt) => allowed.has(String(opt.value)))
      .map((opt) => ({
        id: `${colorAttribute.id}:${opt.value}`,
        name: opt.label || String(opt.value),
        value: String(opt.value),
        meta: opt.meta,
      }));
  }, [colorAttribute, getAvailableValuesForAttribute]);

  const sizeOptions = useMemo(() => {
    if (!sizeAttribute)
      return [] as {
        id: string;
        name: string;
        value: string;
        inStock: boolean;
      }[];
    const allowed = new Set(getAvailableValuesForAttribute(sizeAttribute.id));
    return (sizeAttribute.options || [])
      .filter((opt) => allowed.has(String(opt.value)))
      .map((opt) => ({
        id: `${sizeAttribute.id}:${opt.value}`,
        name: opt.label || String(opt.value),
        value: String(opt.value),
        inStock: true,
      }));
  }, [sizeAttribute, getAvailableValuesForAttribute]);

  return (
    <form>
      {/* Quantity selector */}
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-medium text-gray-900'>
            {dict.common.quantity}
          </h2>
          <OrgIconButton
            onClick={handleToggleWishlist}
            type='button'
            disabled={isTogglingWishlist}
            aria-label={
              isWishlisted
                ? dict.common.remove_from_wishlist
                : dict.common.add_to_wishlist
            }
            title={
              isWishlisted
                ? dict.common.remove_from_wishlist
                : dict.common.add_to_wishlist
            }
          >
            <Heart
              className={isWishlisted ? "text-red-500" : "text-gray-700"}
              fill={isWishlisted ? "#ef4444" : "none"}
            />
          </OrgIconButton>
        </div>
        <div className='mt-2 flex items-center'>
          <OrgIconButton
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            // className='border border-gray-300 p-2 hover:bg-gray-50'
            type='button'
          >
            <Minus />
          </OrgIconButton>
          <span className='text-lg font-medium !mx-3'>{quantity}</span>
          <OrgIconButton
            onClick={() => setQuantity(quantity + 1)}
            // className='border border-gray-300 p-2 hover:bg-gray-50'
            type='button'
          >
            <Plus />
          </OrgIconButton>
        </div>
      </div>
      {/* Colors */}
      {colorOptions.length > 0 && colorAttribute?.id && (
        <ColorPicker
          attributeId={colorAttribute.id}
          options={colorOptions}
          selectedValue={selectedOptions[colorAttribute.id]}
          onChange={(value) =>
            setSelectedOptions((prev) => ({
              ...prev,
              [colorAttribute.id]: value,
            }))
          }
        />
      )}

      {/* Sizes */}
      {sizeOptions.length > 0 && sizeAttribute?.id && (
        <SizePicker
          attributeId={sizeAttribute.id}
          options={sizeOptions}
          selectedValue={selectedOptions[sizeAttribute.id]}
          onChange={(value) =>
            setSelectedOptions((prev) => ({
              ...prev,
              [sizeAttribute.id]: value,
            }))
          }
        />
      )}

      {/* Cart status */}
      {isInCart && (
        <div className='mt-4 rounded-md bg-green-50 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-green-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-green-800'>
                {dict.common.in_cart} ({cartQuantity}{" "}
                {cartQuantity === 1 ? dict.common.item : dict.common.items})
              </p>
            </div>
          </div>
        </div>
      )}
      <ProductPrice
        item={item}
        variants={variants}
        selectedOptions={selectedOptions}
      />
      <button
        type='button'
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        // disabled
        className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isAddingToCart
          ? dict.common.adding_to_cart
          : isInCart
          ? dict.common.update_cart
          : dict.common.add_to_cart}
      </button>
    </form>
  );
}
