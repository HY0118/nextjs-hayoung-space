"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "@hooks/useScrollSpy";
import { useEffect, useState } from "react";

const Navigation = () => {
  const pathname = usePathname();
  const sections = ["about", "skills", "projects", "contact"];
  const activeSection = useScrollSpy(sections);
  const [currentSection, setCurrentSection] = useState("about");
  const [isScrolling, setIsScrolling] = useState(false);
  
  // 블로그 페이지인지 확인
  const isBlogPage = pathname.startsWith("/blog");

  useEffect(() => {
    const hash = window.location.hash;
    const section = hash ? hash.split("/")[0].replace("#", "") : "about";

    if (sections.includes(section)) {
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
    }
  }, [activeSection, isScrolling]);

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
        {sections.map((section) => (
          <li key={section}>
            <Link
              href={`/#${section}`}
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
