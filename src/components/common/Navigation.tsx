"use client";

import Link from "next/link";
import { useScrollSpy } from "@hooks/useScrollSpy";
import { useEffect, useState } from "react";

const Navigation = () => {
  const sections = ["about", "skills", "projects", "contact"];
  const activeSection = useScrollSpy(sections);
  const [currentSection, setCurrentSection] = useState("about");
  const [isScrolling, setIsScrolling] = useState(false);

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
