import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED = ["ko", "en"] as const;

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  // 정적 파일/특정 경로는 제외
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 이미 locale 접두사가 있으면 통과
  const hasLocalePrefix = new RegExp(`^/(?:${SUPPORTED.join("|")})(/|$)`).test(pathname);
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // Vercel Geo 헤더 기반 국가 판단
  const country = req.headers.get("x-vercel-ip-country") || "";
  const locale = country === "KR" ? "ko" : "en";

  const url = nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Next 15 권장: api, _next/static, _next/image, 애셋 파일 등 제외
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
