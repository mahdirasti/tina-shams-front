import { useLoading } from "@/app/hooks";
import axiosInstance, { Pagination } from "@/app/lib/axios";
import { cn, uniqueById, urlWithQueryParams } from "@/app/lib/utils";
import { OrgButton } from "@/components/shared-ui";
import { ReactNode, useEffect, useState } from "react";

type Props<T> = {
  endpoint: string;
  queries?: { [key: string]: any };
  headers?: { [key: string]: any };
  keyOfQueriesDeps?: string;
  loadingState?: ReactNode;
  children: (items: T[]) => ReactNode;
  showMoreText?: string;
  className?: string;
  uniqueField?: string;
};

export default function PaginationMaker<T extends { id: string }>({
  endpoint,
  queries,
  headers,
  keyOfQueriesDeps,
  loadingState = <p className='text-base font-normal'>Loading ...</p>,
  children,
  showMoreText = "Show More",
  className,
  uniqueField = "id",
}: Props<T>) {
  const [page, setPage] = useState(1);
  const { startLoading, stopLoading, isLoading } = useLoading(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [entities, setEntities] = useState<T[]>([]);

  const deps = [page];

  if (keyOfQueriesDeps) deps.push(queries?.[keyOfQueriesDeps]);

  useEffect(() => {
    async function getEntities(page: number) {
      startLoading();
      axiosInstance
        .get<Pagination<T>>(
          urlWithQueryParams(endpoint, { ...queries, page }),
          {
            headers,
          }
        )
        .then((res) => {
          setEntities((prev) =>
            page > 1
              ? (uniqueById(
                  [...prev, ...(res.data.data.items ?? [])],
                  uniqueField
                ) as T[])
              : res.data.data.items
          );
          setHasNextPage(res.data.data.meta.hasNextPage);
          stopLoading();
        })
        .catch((err) => {
          stopLoading();
        });
    }
    getEntities(page);
  }, deps);

  let content = children(entities);

  if (isLoading && page === 1) {
    content = loadingState;
  }

  return (
    <div className={cn("py-6 my-6 border-t md:pb-32 w-full", className)}>
      {content}
      {hasNextPage && (
        <div className='show-more flex flex-col items-center justify-center pt-8'>
          <OrgButton
            className='w-auto bg-black'
            onClick={() => setPage((prev) => prev + 1)}
            loading={isLoading}
          >
            {showMoreText}
          </OrgButton>
        </div>
      )}
    </div>
  );
}
