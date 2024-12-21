"use client";

import axiosInstance from "@/app/lib/axios";
import SplashScreen from "@/components/shared/splash-screen";
import { useEffect, useState } from "react";

type Props = {
  lang: string;
};
export default function ClientInit({ lang }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Adjust timing as needed
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axiosInstance.defaults.headers.common["lang"] = lang;
  }, [lang]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return null;
}
