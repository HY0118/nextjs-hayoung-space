"use client";

import Link from "next/link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useEffect, useState } from "react";

const Navigation = () => {
  const sections = ["about", "skills", "projects", "contact"];
  const activeSection = useScrollSpy(sections);
  const [currentSection, setCurrentSection] = useState(activeSection);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleClick = (section: string) => {
    setIsScrolling(true);
    setCurrentSection(section);

    // 스크롤 애니메이션이 완료되면 isScrolling을 false로 설정
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // 스크롤 애니메이션 예상 시간
  };

  useEffect(() => {
    if (!isScrolling) {
      setCurrentSection(activeSection);
    }
  }, [activeSection, isScrolling]);

  return (
    <nav>
      <ul className="flex gap-8">
        {sections.map((section) => (
          <li key={section}>
            <Link
              href={`/#${section}`}
              onClick={() => handleClick(section)}
              className={`relative text-text-secondary hover:text-primary transition-colors
                ${currentSection === section ? "text-primary" : ""}
                after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 
                after:h-0.5 after:bg-primary after:origin-left
                after:transition-transform after:duration-300 after:ease-out
                ${currentSection === section ? "after:scale-x-100" : "after:scale-x-0"}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
