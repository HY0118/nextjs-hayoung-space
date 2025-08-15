export const SUPPORTED_LOCALE_CODES = ["ko", "en"] as const;

export function isLocaleRootPath(pathname: string): boolean {
  const parts = pathname.split("/");
  const first = parts[1] || "";
  const second = parts[2];
  return (SUPPORTED_LOCALE_CODES as readonly string[]).includes(first) && (second === undefined || second === "");
}

export function withTrailingSlash(pathname: string): string {
  if (!pathname) return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function getLocaleFromPathname(pathname: string): "ko" | "en" | null {
  const first = (pathname.split("/")[1] || "") as string;
  return (SUPPORTED_LOCALE_CODES as readonly string[]).includes(first) ? (first as "ko" | "en") : null;
}

export function buildHomeBase(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  return locale ? `/${locale}/` : "/";
}


