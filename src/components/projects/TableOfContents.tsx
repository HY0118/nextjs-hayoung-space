import { useEffect, useState } from "react";
import { useProjectStore } from "@store/projectStore";

interface Section {
  id: string;
  label: string;
}

const TableOfContents = () => {
  const { selectedProject } = useProjectStore();
  const [activeSection, setActiveSection] = useState<string>("");

  const [availableSections, setAvailableSections] = useState<Section[]>([]);

  useEffect(() => {
    if (!selectedProject) return;

    // 프로젝트의 실제 섹션들을 확인하여 동적으로 sections 배열 생성
    const sections: Section[] = [];

    // Overview는 항상 있음
    sections.push({ id: "overview", label: "Overview" });

    // Demo 섹션 체크
    if (selectedProject.details.demoGif || selectedProject.details.demoVideo) {
      sections.push({ id: "demo", label: "Demo" });
    }

    // Features 섹션 체크
    if (selectedProject.details.features?.length > 0) {
      sections.push({ id: "features", label: "Features" });
    }

    // Challenges 섹션 체크
    if (selectedProject.details.challenges?.length > 0) {
      sections.push({ id: "challenges", label: "Challenges" });
    }

    // Tech Stack 섹션 체크
    if (selectedProject.details.techStack?.length > 0) {
      sections.push({ id: "tech-stack", label: "Tech Stack" });
    }

    // Lessons 섹션 체크
    if (selectedProject.details.lessons?.length > 0) {
      sections.push({ id: "lessons", label: "Lessons" });
    }

    // Screenshots 섹션 체크
    if (selectedProject.details.images?.length > 0) {
      sections.push({ id: "screenshots", label: "Screenshots" });
    }

    setAvailableSections(sections);
  }, [selectedProject]);

  const scrollToSection = (sectionId: string) => {
    const scrollContainer = document.querySelector(".project-detail-content .overflow-y-auto");
    const element = document.getElementById(sectionId);

    if (scrollContainer && element) {
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const elementTop = element.getBoundingClientRect().top;
      const relativePosition = elementTop - containerTop;

      scrollContainer.scrollTo({
        top: scrollContainer.scrollTop + relativePosition - 100,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const scrollContainer = document.querySelector(".project-detail-content .overflow-y-auto");

    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);

        if (visibleSections.length > 0) {
          const middleOfContainer = scrollContainer.clientHeight / 2;
          let closestSection = visibleSections[0];
          let minDistance = Infinity;

          visibleSections.forEach((section) => {
            const rect = section.target.getBoundingClientRect();
            const containerRect = scrollContainer.getBoundingClientRect();
            const relativeTop = rect.top - containerRect.top;
            const distance = Math.abs(relativeTop + rect.height / 2 - middleOfContainer);

            if (distance < minDistance) {
              minDistance = distance;
              closestSection = section;
            }
          });

          setActiveSection(closestSection.target.id);
        }
      },
      {
        root: scrollContainer,
        threshold: 0.2,
        rootMargin: "-10% 0px -45% 0px",
      }
    );

    availableSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-1/3 top-64 -translate-y-24 space-y-2 hidden xl:block">
      {availableSections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`block text-sm px-3 py-1.5 rounded-lg transition-all duration-200
            ${
              activeSection === section.id
                ? "text-primary bg-gray-100 dark:bg-gray-800 font-medium"
                : "text-text-secondary hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50"
            }
          `}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
};

export default TableOfContents;
