"use server"

import { cookies } from "next/headers"
import { _VARZ } from "../const/_varz"

export default async function getServerToken() {
  // const token = cookies().get(_VARZ.tokenCookieKey)?.value || ""
  const token = ""
  return token ?? undefined
}
