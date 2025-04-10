import { _VARZ } from "@/app/const/_varz";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete(_VARZ.tokenCookieKey);

  return redirect("/");
}
