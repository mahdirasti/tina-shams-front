"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getLinkWithLocale } from "@/app/lib/utils";
import { HeartIcon, LogOut, ShoppingBagIcon, UserIcon } from "lucide-react";
import { useLocale } from "../../../locale-context";
import { OrgButton } from "@/components/shared-ui";
import { clearUserToken } from "@/app/actions/auth";
import { useAppDispatch } from "@/redux/store";
import { clearCredentials } from "@/redux/slices/auth-slice";

type SidebarProps = {
  locale: string;
};

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
};

function getNavigation(locale: string): NavItem[] {
  const { dict } = useLocale();

  return [
    {
      name: dict?.common?.my_orders || "My Orders",
      href: getLinkWithLocale("/profile/orders", locale),
      icon: ShoppingBagIcon,
    },
    {
      name: dict?.common?.profile || "Profile",
      href: getLinkWithLocale("/profile/edit", locale),
      icon: UserIcon,
    },
    {
      name: dict?.common?.favorites || "Favorites",
      href: getLinkWithLocale("/profile/favorites", locale),
      icon: HeartIcon,
    },
  ];
}

export default function Sidebar({ locale }: SidebarProps) {
  const pathname = usePathname();
  const navigation = getNavigation(locale);
  const { dict } = useLocale();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    clearUserToken();
  };

  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white h-full'>
      <nav className='flex flex-1 flex-col gap-y-4'>
        <ul role='list' className='flex flex-1 flex-col gap-y-7'>
          <li>
            <ul role='list' className='space-y-1'>
              {navigation.map((item) => {
                const isActive =
                  item.href === pathname ||
                  pathname.startsWith(item.href + "/");
                const Icon = item.icon;

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        isActive
                          ? "bg-gray-50 text-black"
                          : "text-black/60 hover:bg-gray-50 hover:text-black",
                        "group flex gap-x-3 py-3 px-4 text-sm/6 font-semibold"
                      )}
                    >
                      <Icon
                        aria-hidden='true'
                        className={cn(
                          isActive
                            ? "text-black"
                            : "text-black/60 group-hover:text-black",
                          "size-6 shrink-0"
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <OrgButton
              onClick={handleLogout}
              startIcon={<LogOut size={16} />}
              variant='outlined'
              className='w-full border-red-500 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white'
            >
              {dict?.common?.logout || "Logout"}
            </OrgButton>
          </li>
        </ul>
      </nav>
    </div>
  );
}
