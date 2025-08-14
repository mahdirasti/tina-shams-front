"use server";

import { cookies } from "next/headers";
import { _VARZ } from "../const/_varz";
import { decodeWithSecret } from "../utils";

export type UserSession = {
  isAuthenticated: boolean;
  data?: {
    accessToken: string;
  };
};

export default async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(_VARZ.tokenCookieKey)?.value || "";

  return {
    data: {
      accessToken: token,
    },
    isAuthenticated: !!token,
  } as UserSession;
}
