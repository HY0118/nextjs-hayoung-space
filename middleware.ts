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

  // 이미 locale 접두사가 있으면 통과
  const hasLocalePrefix = new RegExp(`^/(?:${SUPPORTED.join("|")})(/|$)`).test(pathname);
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  const locale = detectLocale(req);

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
