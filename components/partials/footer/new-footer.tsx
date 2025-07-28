"use client";

import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import Logo from "@/components/shared/logo";
import moment from "jalali-moment";
import { useMemo } from "react";

const navigation = {
  tina: [
    { name: "about", href: "/about" },
    { name: "blog", href: "/blog" },
    { name: "contact", href: "/contact" },
    { name: "faq", href: "/faq" },
  ],
  support: [
    { name: "ordering_and_payment", href: "/ordering-and-payment" },
    { name: "terms_of_use", href: "/terms-of-use" },
    { name: "return_and_refund", href: "/return-and-refund" },
    { name: "privacy_policy", href: "/privacy-policy" },
  ],
  accesses: [
    { name: "shop", href: "/shop" },
    { name: "account", href: "/account" },
    { name: "cart", href: "/cart" },
    { name: "wishlist", href: "/wishlist" },
    { name: "contact", href: "/contact" },
  ],
  social: [
    {
      name: "instagram",
      href: "https://www.instagram.com/bytinashams/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
  ],
};

export default function NewFooter() {
  const { dict, locale } = useLocale();

  const footerCopyRight = useMemo(() => {
    let year = new Date().getFullYear();

    if (locale === "fa") {
      year = moment().year();
    }

    return (
      <p className='text-sm/6 text-gray-600'>
        &copy; {year} {dict.common.all_rights_reserved}
      </p>
    );
  }, [locale]);

  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='space-y-8'>
            <Logo />
            <p className='text-balance text-sm/6 text-gray-600'>
              Illuminate your elegance, bling & shine.
            </p>
            <div className='flex gap-x-6'>
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-gray-600 hover:text-gray-800'
                >
                  <span className='sr-only'>{item.name}</span>
                  <item.icon aria-hidden='true' className='size-6' />
                </a>
              ))}
            </div>
            <div className='flex items-center justify-center gap-2'>
              <img
                referrerPolicy='origin'
                id='rgvjoeukjxlzwlaosizpfukz'
                style={{ cursor: "pointer", width: "72px", height: "auto" }}
                onClick={() =>
                  window.open(
                    "https://logo.samandehi.ir/Verify.aspx?id=381496&p=xlaomcsirfthaodspfvlgvka",
                    "Popup",
                    "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
                  )
                }
                alt='logo-samandehi'
                src='https://logo.samandehi.ir/logo.aspx?id=381496&p=qftiaqgwnbpdshwlbsiywlbq'
              />
              <a
                referrerPolicy='origin'
                target='_blank'
                href='https://trustseal.enamad.ir/?id=626024&Code=MHtp3w9wNVCLzFMyvwYP33CEHRTmWc7c'
              >
                <img
                  referrerPolicy='origin'
                  src='https://trustseal.enamad.ir/logo.aspx?id=626024&Code=MHtp3w9wNVCLzFMyvwYP33CEHRTmWc7c'
                  alt=''
                  className='w-[72px] h-auto'
                  //@ts-ignore
                  code='MHtp3w9wNVCLzFMyvwYP33CEHRTmWc7c'
                />
              </a>
            </div>
          </div>
          <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div className='mb-8 md:mb-0'>
                <h3 className='text-sm/6 font-semibold text-gray-900'>
                  {dict.common.tina_shams}
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {navigation.tina.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm/6 text-gray-600 hover:text-gray-900'
                      >
                        {dict.common[item.name]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='text-sm/6 font-semibold text-gray-900'>
                  {dict.common.fast_access}
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {navigation.accesses.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm/6 text-gray-600 hover:text-gray-900'
                      >
                        {dict.common[item.name]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm/6 font-semibold text-gray-900'>
                  {dict.common.support}
                </h3>
                <ul role='list' className='mt-6 space-y-4'>
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className='text-sm/6 text-gray-600 hover:text-gray-900'
                      >
                        {dict.common[item.name]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24'>
          <div className='text-sm/6 text-gray-600'>{footerCopyRight}</div>
        </div>
      </div>
    </footer>
  );
}
