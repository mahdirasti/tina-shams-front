"use client";

import axiosInstance from "@/app/lib/axios";
import { useEffect } from "react";

type Props = {
  lang: string;
};
export default function ClientInit({ lang }: Props) {
  useEffect(() => {
    axiosInstance.defaults.headers.common["lang"] = lang;
  }, [lang]);

  return null;
}
