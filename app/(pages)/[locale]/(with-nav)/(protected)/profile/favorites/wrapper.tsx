"use client";

import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/app/lib/axios";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import OrgPagination from "@/components/shared-ui/o-pagination";
import ProductCard from "@/app/(pages)/[locale]/(with-nav)/(public)/shop/components/product-list/card";
import { PieceType } from "@/types/piece";

type WishlistResponse = {
  data?:
    | {
        items?: PieceType[];
        page?: number;
        limit?: number;
        total?: number;
        meta?: { totalItems?: number; page?: number; perPage?: number };
        _meta?: { totalCount?: number; currentPage?: number; perPage?: number };
      }
    | PieceType[];
};

export default function ProfileFavoritesWrapper() {
  const { dict } = useLocale();

  const [items, setItems] = useState<PieceType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/wishlist/my`, {
          params: { page, limit: perPage },
        });

        const payload: WishlistResponse = (res as any)?.data ?? {};
        const data: any = (payload as any)?.data ?? payload;

        const receivedItems: PieceType[] = Array.isArray(data)
          ? (data as PieceType[])
          : Array.isArray(data?.items)
          ? (data.items as PieceType[])
          : [];

        const total: number =
          (data?.total as number) ??
          (data?._meta?.totalCount as number) ??
          (data?.meta?.totalItems as number) ??
          receivedItems.length ??
          0;

        const per: number =
          (data?.limit as number) ??
          (data?._meta?.perPage as number) ??
          (data?.meta?.perPage as number) ??
          perPage;

        const current: number =
          (data?.page as number) ??
          (data?._meta?.currentPage as number) ??
          (data?.meta?.page as number) ??
          page;

        setItems(receivedItems);
        setTotalItems(typeof total === "number" ? total : 0);
        setPerPage(typeof per === "number" && per > 0 ? per : 12);
        setPage(typeof current === "number" && current > 0 ? current : 1);
      } catch (e) {
        setItems([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage]);

  const emptyState = useMemo(
    () => !loading && items.length === 0,
    [loading, items.length]
  );

  return (
    <div className='mt-4'>
      {loading && (
        <div className='text-sm text-gray-500'>
          {dict?.common?.loading || "Loading..."}
        </div>
      )}

      {emptyState && (
        <div className='text-sm text-gray-500'>
          {dict?.common?.no_favorites_yet || "No favorites yet."}
        </div>
      )}

      {!emptyState && (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <div className='mt-8 flex justify-center'>
          <OrgPagination
            currentPage={page}
            totalItems={totalItems}
            perPage={perPage}
            onPageChange={(p) => {
              if (p >= 1 && p !== page) setPage(p);
            }}
          />
        </div>
      )}
    </div>
  );
}
