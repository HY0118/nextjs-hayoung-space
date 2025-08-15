"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "@hooks/useScrollSpy";
import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/interfaces/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const activeSection = useScrollSpy(SECTIONS as unknown as string[]);
  const [currentSection, setCurrentSection] = useState("about");
  const [isScrolling, setIsScrolling] = useState(false);
  
  // 페이지 타입 판별 (로케일 접두사 고려)
  const isBlogPage = /^\/(blog|(ko|en)\/blog)(\/|$)/.test(pathname);
  const isHomePage = pathname === "/" || /^\/(ko|en)\/?$/.test(pathname);

  useEffect(() => {
    const hash = window.location.hash;
    const section = (hash ? hash.split("/")[0].replace("#", "") : "about") as SectionId;

    if ((SECTIONS as readonly SectionId[]).includes(section)) {
      setCurrentSection(section);
      setIsScrolling(true);

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (!isScrolling && activeSection) {
      setCurrentSection(activeSection);
      // 홈에서만 URL 해시를 섹션에 맞춰 갱신
      if (isHomePage && typeof window !== "undefined") {
        const currentHash = window.location.hash;
        // 프로젝트 상세 중(#projects/...)일 때는 해시를 보존
        const isProjectDetailHash = currentHash.startsWith("#projects/");
        const nextHash = `#${activeSection}`;
        if (!isProjectDetailHash && currentHash !== nextHash) {
          // 현재 경로를 보존하고 해시만 업데이트
          history.replaceState(null, "", `${window.location.pathname}${nextHash}`);
        }
      }
    }
  }, [activeSection, isScrolling, isHomePage]);

  const handleClick = (section: string) => {
    setIsScrolling(true);
    setCurrentSection(section);

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const handleBlogClick = () => {
    // 스크롤 복원 기능 비활성화
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  };

  return (
    <nav>
      <ul className="flex gap-8">
        {(SECTIONS as readonly SectionId[]).map((section) => (
          <li key={section}>
            <Link
              href={`#${section}`}
              onClick={() => handleClick(section)}
              className={`relative text-text-secondary hover:text-primary transition-colors
                ${currentSection === section && !isBlogPage ? "text-primary" : ""}
                after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 
                after:h-0.5 after:bg-primary after:origin-left
                after:transition-transform after:duration-300 after:ease-out
                ${currentSection === section && !isBlogPage ? "after:scale-x-100" : "after:scale-x-0"}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </li>
        ))}
        {/* Blog Link */}
        <li>
          <Link
            href="/blog"
            onClick={handleBlogClick}
            className={`relative text-text-secondary hover:text-primary transition-colors
              ${isBlogPage ? "text-primary" : ""}
              after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 
              after:h-0.5 after:bg-primary after:origin-left
              after:transition-transform after:duration-300 after:ease-out
              ${isBlogPage ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
