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
  const token = cookies().get(_VARZ.tokenCookieKey)?.value || "";

  let data = undefined;
  data = decodeWithSecret(token);

  return {
    data,
    isAuthenticated: !!data?.accessToken,
  } as UserSession;
}
