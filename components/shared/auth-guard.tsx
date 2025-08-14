"use client";

import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { is_loading } = useAuth();

  if (is_loading) {
    return null;
  }

  return <>{children}</>;
}
