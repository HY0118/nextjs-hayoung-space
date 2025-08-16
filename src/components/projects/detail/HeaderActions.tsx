"use client";

import type { Project } from "@interfaces/project";
import Title from "@/components/projects/detail/header/Title";
import RepoBadge from "@/components/projects/detail/header/RepoBadge";
import NpmBadge from "@/components/projects/detail/header/NpmBadge";
import DemoButton from "@/components/projects/detail/header/DemoButton";
import CloseButton from "@/components/projects/detail/header/CloseButton";

interface HeaderActionsProps {
  project: Project;
  onClose: () => void;
}

const HeaderActions = ({ project, onClose }: HeaderActionsProps) => {
  return (
    <div className="flex justify-between items-center">
      <Title text={project.title} />
      <div className="flex items-center gap-4">
        <RepoBadge github={project.github} />
        <NpmBadge npm={project.npm} />
        <DemoButton href={project.demo} />
        <CloseButton onClick={onClose} />
      </div>
    </div>
  );
};

export default HeaderActions;


