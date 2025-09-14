import { Truck, Globe, StarIcon } from "lucide-react";
import ProductActions from "./components/actions";
import { classNames, getFullAssets, getLinkWithLocale } from "@/app/lib/utils";
import { fetchData } from "@/app/lib/fetch";
import { _CACHE } from "@/app/const/_varz";
import { PieceType } from "@/types/piece";
import OrgBreadcrumb from "@/components/shared-ui/o-breadcrumb";
import { getDictionary } from "@/app/(pages)/[locale]/dictionaries";
import { FetchDataType } from "@/app/lib/axios";
import { MainContainer } from "@/components/containers";
import OrgDivider from "@/components/shared-ui/o-divider";
import SimilarProducts from "../../pieces/[slug]/components/similar-products";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export default async function SingleProductPage({ params }: Props) {
  const { slug, locale } = await params;

  const t = await getDictionary(locale);

  const policies = [
    {
      name: t.common.policy_warranty_name,
      icon: StarIcon,
    },
    {
      name: t.common.policy_free_shipping_name,
      icon: Globe,
    },
    {
      name: t.common.policy_3hr_tehran_name,
      icon: Truck,
    },
  ];

  //Setting two minutes for caching
  const fetchingConfig = {
    next: { revalidate: _CACHE.commonRevalidation },
    headers: {
      lang: locale,
    },
  };

  const productRes = await fetchData<FetchDataType<PieceType>>(
    `/products/${slug}`,
    fetchingConfig
  );

  const product = productRes.data;

  const productRating = product.rating ?? 0;
  const productReviewCount = product.reviewCount ?? 0;
  const productImages = [product.thumbnail, product.cover];

  return (
    <div className='bg-white mt-0 md:mt-4'>
      <div className='pb-16 pt-4 md:pt-6 sm:pb-24'>
        <MainContainer>
          <OrgBreadcrumb
            items={[
              { title: t.common.home, href: getLinkWithLocale("/", locale) },
              {
                title: t.common.shop,
                href: getLinkWithLocale("/shop", locale),
              },
              {
                title: product.title,
                href: getLinkWithLocale(`/shop/${product.slug}`, locale),
              },
            ]}
          />
        </MainContainer>
        <OrgDivider className='md:hidden mt-5' />
        <div className='mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-4'>
          <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
            <div className='lg:col-span-5 lg:col-start-8'>
              <div className='flex justify-between'>
                <h1 className='text-xl font-medium text-gray-900'>
                  {product.title}
                </h1>
                <p className='text-xl font-medium text-gray-900'>
                  {parseFloat(product.weight).toLocaleString()} {t.common.grams}
                </p>
              </div>
              {/* Reviews */}
              <div className='mt-4'>
                <h2 className='sr-only'>{t.common.reviews}</h2>
                <div className='flex items-center'>
                  <p className='text-sm text-gray-700'>
                    {product.rating}
                    <span className='sr-only'> {t.common.out_of_5_stars}</span>
                  </p>
                  <div className='ml-1 flex items-center'>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden='true'
                        className={classNames(
                          productRating > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden='true'
                    className='ml-4 text-sm text-gray-300'
                  >
                    ·
                  </div>
                  {productReviewCount > 0 && (
                    <div className='ml-4 flex'>
                      <a
                        href='#'
                        className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        {t.common.see_all_reviews.replace(
                          "{count}",
                          String(productReviewCount)
                        )}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className='mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
              <h2 className='sr-only'>{t.common.images}</h2>

              <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-8'>
                {productImages
                  ?.filter((a) => a.fileName)
                  .map((image, index) => (
                    <img
                      key={index}
                      alt={`Image ${index + 1} of ${product.title}`}
                      src={getFullAssets(image.fileName)}
                      className={classNames(
                        index === 0
                          ? "lg:col-span-2 lg:row-span-2"
                          : "hidden lg:block",
                        "rounded-lg"
                      )}
                    />
                  ))}
              </div>
            </div>

            <div className='mt-8 lg:col-span-5'>
              <ProductActions item={product} />

              {/* Product details */}
              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-900'>
                  {t.common.description}
                </h2>

                <div
                  dangerouslySetInnerHTML={{ __html: product.design_desc }}
                  className='mt-4 space-y-4 text-sm/6 text-gray-500'
                />
              </div>

              {/* <div className='mt-8 border-t border-gray-200 pt-8'>
                <h2 className='text-sm font-medium text-gray-900'>
                  {t.common.fabric_and_care}
                </h2>

                {productDetails?.length > 0 && (
                  <div className='mt-4'>
                    <ul
                      role='list'
                      className='list-disc space-y-1 pl-5 text-sm/6 text-gray-500 marker:text-gray-300'
                    >
                      {productDetails?.map((item) => (
                        <li key={item} className='pl-2'>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div> */}

              {/* Policies */}
              <section aria-labelledby='policies-heading' className='mt-10'>
                <h2 id='policies-heading' className='sr-only'>
                  {t.common.our_policies}
                </h2>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                  {policies.map((policy, index) => (
                    <div
                      key={index}
                      className='rounded-lg border border-gray-200 bg-gray-50 p-6 text-center'
                    >
                      <div className='flex flex-col items-center'>
                        <policy.icon
                          aria-hidden='true'
                          className='mx-auto size-6 shrink-0 text-gray-400'
                        />
                        <span className='mt-4 text-sm font-medium text-gray-900'>
                          {policy.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <MainContainer className='mb-8'>
        <SimilarProducts
          similar_products={product.similarProducts ?? []}
          shop
        />
      </MainContainer>
    </div>
  );
}
