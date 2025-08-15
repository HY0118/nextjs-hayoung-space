import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED = ["ko", "en"] as const;

function detectLocale(req: NextRequest): "ko" | "en" {
  // 1) 사용자 선택 쿠키 우선
  const cookieLocale =
    req.cookies.get("locale")?.value ||
    req.cookies.get("NEXT_LOCALE")?.value ||
    req.cookies.get("i18next")?.value;
  if (cookieLocale && (SUPPORTED as unknown as string[]).includes(cookieLocale)) {
    return cookieLocale as "ko" | "en";
  }

  // 2) Vercel Geo (Edge Runtime)
  // NextRequest의 비공식 geo 속성 접근 (Edge Runtime 제공)
  const geoCountry = (req as unknown as { geo?: { country?: string } }).geo?.country;
  if (geoCountry === "KR") return "ko";

  // 3) 헤더 (프록시/로컬 테스트)
  const headerCountry = req.headers.get("x-vercel-ip-country");
  if (headerCountry === "KR") return "ko";

  // 4) 브라우저 선호 언어
  const acceptLanguage = req.headers.get("accept-language") || "";
  if (/\bko\b/i.test(acceptLanguage)) return "ko";

  // 5) 기본값
  return "en";
}

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

  // 이미 locale 접두사가 있으면 루트 형태(/ko 또는 /en)라면 슬래시를 붙여 정규화
  const localeRootRegex = new RegExp(`^/(?:${SUPPORTED.join("|")})(?:/)?$`);
  const hasLocalePrefix = new RegExp(`^/(?:${SUPPORTED.join("|")})(/|$)`).test(pathname);
  if (hasLocalePrefix) {
    const match = pathname.match(new RegExp(`^/(${SUPPORTED.join("|")})(?:/|$)`));
    const currentLocale = (match?.[1] || "") as "ko" | "en" | "";
    if (localeRootRegex.test(pathname) && !pathname.endsWith("/")) {
      const url = nextUrl.clone();
      url.pathname = `${pathname}/`;
      const res = NextResponse.redirect(url);
      if (currentLocale) res.cookies.set("NEXT_LOCALE", currentLocale, { path: "/", sameSite: "lax" });
      return res;
    }
    const res = NextResponse.next();
    if (currentLocale) res.cookies.set("NEXT_LOCALE", currentLocale, { path: "/", sameSite: "lax" });
    return res;
  }

  const locale = detectLocale(req);

  const url = nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set("NEXT_LOCALE", locale, { path: "/", sameSite: "lax" });
  return res;
}

export const config = {
  // Next 15 권장: api, _next/static, _next/image, 애셋 파일 등 제외
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
