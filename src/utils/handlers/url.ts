import { projects } from '@constants/projects';

import type { Project } from '@/interfaces/project';

export interface UrlHandler {
  setSelectedProject: (project: Project | null) => void;
  openDetail: (mode: 'panel' | 'modal') => void;
}

// URL 해시에서 프로젝트 정보 파싱 및 처리
export function handleUrlHash(handlers: UrlHandler): void {
  const hash = window.location.hash;
  if (!hash) return;

  const [section, projectId] = hash.replace('#', '').split('/');

  // 프로젝트 상세 페이지 처리
  if (section === 'projects' && projectId) {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      handlers.setSelectedProject(project);
      handlers.openDetail('panel');
      return; // 프로젝트 상세페이지 열 때는 스크롤하지 않음
    }
  }

  // 일반 섹션 스크롤 처리 (프로젝트 상세가 아닐 때만)
  const targetSection = document.getElementById(section);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'instant' });
  }
}

// 개발 환경에서 인트로 건너뛰기 여부 확인
export function shouldSkipIntroInDev(): boolean {
  return process.env.NODE_ENV === 'development';
}
