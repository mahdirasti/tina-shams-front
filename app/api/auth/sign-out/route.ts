import { _VARZ } from "@/app/const/_varz";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function GET() {
  cookies().delete(_VARZ.tokenCookieKey);

  return redirect("/");
}
