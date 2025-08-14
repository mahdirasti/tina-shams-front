"use server";

import { cookies } from "next/headers";
import { _VARZ } from "../const/_varz";
import { redirect } from "next/navigation";

export async function storeUserToken(token: string) {
  (await cookies()).set(_VARZ.tokenCookieKey, token);
}

export async function clearUserToken(hasRedirect: boolean = true) {
  (await cookies()).delete(_VARZ.tokenCookieKey);
  if (hasRedirect) return redirect(`/`);
}
