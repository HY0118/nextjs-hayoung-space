import { Project } from "@/store/projectStore";

export const projects: Project[] = [
  {
    id: "project1",
    title: "프로젝트 제목",
    description: "프로젝트 간단 설명",
    image: "/images/Project_Thumbnail.webp",
    tech: ["React", "TypeScript", "Next.js"],
    github: "https://github.com/",
    demo: "https://demo.com",
    details: {
      overview: "프로젝트 상세 설명...",
      features: ["주요 기능 1", "주요 기능 2"],
      challenges: ["해결한 문제 1", "해결한 문제 2"],
      images: ["/detail1.png", "/detail2.png"],
    },
  },
  // 추가 프로젝트...
];
