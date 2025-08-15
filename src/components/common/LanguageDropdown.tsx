"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import i18n, { SUPPORTED_LOCALES } from "@/i18n";

export default function LanguageDropdown() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [, startTransition] = useTransition();

  const supported = SUPPORTED_LOCALES as unknown as string[];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const currentLocale = useMemo(() => {
    const firstSegment = pathname.split("/")[1];
    if (supported.includes(firstSegment)) return firstSegment;
    return (i18n.language || "ko").split("-")[0];
  }, [pathname, supported]);

  const buildPathWithLocale = (targetLocale: string) => {
    const firstSegment = pathname.split("/")[1];
    const hasLocalePrefix = supported.includes(firstSegment);
    if (hasLocalePrefix) {
      const rest = pathname.split("/").slice(2).join("/");
      return `/${targetLocale}${rest ? `/${rest}` : ""}`;
    }
    if (pathname === "/") return `/${targetLocale}`;
    return `/${targetLocale}${pathname}`;
  };

  const switchLocale = (nextLocale: string) => {
    const nextPath = buildPathWithLocale(nextLocale);
    startTransition(() => {
      i18n.changeLanguage(nextLocale);
      router.push(nextPath);
      setOpen(false);
    });
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const label = currentLocale === "en" ? "EN" : "KO";
  const flag = currentLocale === "en" ? "🇺🇸" : "🇰🇷";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/40 bg-background/80 backdrop-blur text-text-primary hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors font-sora shadow"
      >
        <span className="text-base leading-none">{flag}</span>
        <span className="text-sm tracking-wide">{label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Menu */}
      <div
        role="menu"
        className={`absolute right-0 mt-2 w-36 rounded-xl border border-border/40 bg-background/95 backdrop-blur p-1 shadow-xl transition-all duration-150 origin-top-right ${
          open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
        }`}
      >
        {[
          { code: "ko", name: "한국어", short: "KO", icon: "🇰🇷" },
          { code: "en", name: "English", short: "EN", icon: "🇺🇸" },
        ].map(({ code, name, short, icon }) => {
          const active = currentLocale === code;
          return (
            <button
              key={code}
              role="menuitem"
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-text-primary"
                  : "text-text-secondary hover:bg-gray-50/70 dark:hover:bg-gray-900/30"
              }`}
              onClick={() => switchLocale(code)}
            >
              <span className="text-base">{icon}</span>
              <span className="flex-1 text-left">{name}</span>
              <span className="text-xs opacity-70">{short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


