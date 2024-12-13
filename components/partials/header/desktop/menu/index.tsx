import React from "react";
import { headerMenuItems } from "../..";
import Link from "next/link";

export default function DesktopHeaderMenu() {
  return (
    <nav>
      <ul className='flex flex-row items-center justify-center gap-x-12'>
        {headerMenuItems.map((menuItem, key) => (
          <li key={key}>
            <Link
              href={menuItem.href}
              title={menuItem.title}
              className='font-medium text-sm'
            >
              {menuItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
