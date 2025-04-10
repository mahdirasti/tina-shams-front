import { headers } from "next/headers";

function sanitizeUrlForCanonical({
  url,
  forceEn,
  depth,
}: {
  url: string;
  forceEn?: boolean;
  depth?: number;
}): string {
  const parsed = new URL(url);
  const segments = parsed.pathname.split("/").filter(Boolean); // remove empty parts

  if (forceEn) {
    segments[0] = "en";
  }

  if (depth) {
    segments.splice(depth + 1);
  }

  parsed.pathname = "/" + segments.join("/");
  parsed.search = ""; // remove all query parameters

  return parsed.toString();
}

export async function getCanonicalURL({
  forceEn,
  depth,
}: {
  forceEn?: boolean;
  depth?: number;
} = {}) {
  const headersList = await headers();
  const pathname = headersList.get("x-url");

  if (!pathname) return;

  const canonical = sanitizeUrlForCanonical({ url: pathname, forceEn, depth });

  return canonical;
}
