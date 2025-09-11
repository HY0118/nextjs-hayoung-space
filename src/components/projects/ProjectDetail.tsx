'use client';

// import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from 'react';

import { createCloseProjectDetailHandler } from '@/utils/api/detail';

import Achievements from '@/components/projects/detail/Achievements';
import DetailShell from '@/components/projects/detail/DetailShell';
import DividerToggle from '@/components/projects/detail/DividerToggle';
import HeaderActions from '@/components/projects/detail/HeaderActions';
import ImageViewerModal from '@/components/projects/detail/ImageViewerModal';
import KeyFeatures from '@/components/projects/detail/KeyFeatures';
import MediaTabs from '@/components/projects/detail/MediaTabs';
import OptionalDetails from '@/components/projects/detail/OptionalDetails';
import Overview from '@/components/projects/detail/Overview';
import Performance from '@/components/projects/detail/Performance';
import TechChips from '@/components/projects/detail/TechChips';
import TechnicalIssues from '@/components/projects/detail/TechnicalIssues';
import TechnicalIssueDetail from '@/components/technical-issues/TechnicalIssueDetail';

import { useModalVisibility } from '@/hooks/useModalVisibility';
import { usePreloadScreenshots } from '@/hooks/usePreloadScreenshots';
import { useProjectDerivedData } from '@/hooks/useProjectDerivedData';

import { useProjectStore } from '@/store/projectStore';

import { PROJECT_DETAIL_CONFIG } from '@/constants/projectDetailConfig';
import { TECHNICAL_ISSUES } from '@/constants/technicalIssues';

import type { MediaTab, ProjectDetailProps } from '@/interfaces/projectDetail';

const ProjectDetail = ({ variant: propVariant = 'panel' }: ProjectDetailProps) => {
  const { selectedProject, closeDetail, setSelectedProject } = useProjectStore();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<MediaTab>(
    PROJECT_DETAIL_CONFIG.media.defaultActiveTab,
  );
  const { open: openModal, close: closeModal } = useModalVisibility();
  const [selectedTechnicalIssue, setSelectedTechnicalIssue] = useState<string | null>(
    null,
  );

  const preloadImage = useCallback((url: string) => {
    const img = new window.Image();
    img.src = url;
  }, []);

  const handleOpenViewer = (index: number) => {
    setViewerIndex(index);
    openModal();
  };

  useEffect(() => {
    if (!selectedProject) return;
    selectedProject.details.images.slice(0, 2).forEach((img) => preloadImage(img.url));
  }, [selectedProject, preloadImage]);

  const variant = propVariant;
  const handleClose = createCloseProjectDetailHandler({
    closeDetail,
    setSelectedProject,
    closeModal,
    useHistory: variant !== 'modal',
  });
  const {
    achievements,
    features,
    performance,
    learnings,
    futureImprovements,
    screenshots,
    hasVideoOrGif,
  } = useProjectDerivedData(selectedProject);
  usePreloadScreenshots(selectedProject?.details.images ?? [], 2);

  if (!selectedProject) return null;

  return (
    <>
      <DetailShell
        header={
          <HeaderActions
            project={selectedProject}
            onClose={handleClose}
          />
        }
        backgroundClassName={PROJECT_DETAIL_CONFIG.layout.backgroundClassName}
        headerPaddingClassName={PROJECT_DETAIL_CONFIG.layout.headerPaddingClassName}
        contentPaddingClassName={`${PROJECT_DETAIL_CONFIG.layout.contentPaddingClassName} `}
        maxWidthClassName={
          variant === 'modal'
            ? 'max-w-6xl'
            : PROJECT_DETAIL_CONFIG.layout.maxWidthClassName
        }
        className="z-50"
        variant={variant}
      >
        {/* 1. 프로젝트 개요 - 무엇을 만들었는지 */}
        <Overview text={selectedProject.details.overview} />

        {/* 2. 성과 지표 - 내가 달성한 것들 */}
        <Achievements items={achievements} />

        {/* 3. 성능 개선 결과 - 구체적인 임팩트 */}
        <Performance performance={performance} />

        {/* 4. 기술 문제 해결 - 심화 기술 경험 */}
        <TechnicalIssues
          project={selectedProject}
          onIssueClick={setSelectedTechnicalIssue}
        />

        {/* 5. 핵심 기능 & 기술 스택 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <KeyFeatures features={features} />
          <TechChips tech={selectedProject.tech} />
        </div>

        {/* 6. 실제 결과물 - 시각적 증거 */}
        <MediaTabs
          project={selectedProject}
          screenshots={screenshots}
          hasVideoOrGif={hasVideoOrGif}
          activeTab={activeMediaTab}
          onChangeTab={setActiveMediaTab}
          onOpenViewer={handleOpenViewer}
          onPreload={preloadImage}
        />

        {/* Divider toggle for more details */}
        <DividerToggle
          expanded={showDetails}
          onToggle={() => setShowDetails((v) => !v)}
        />

        {showDetails && (
          <>
            <OptionalDetails
              problemStatement={selectedProject.details.problemStatement}
              solutionApproach={selectedProject.details.solutionApproach}
              architecture={selectedProject.details.architecture}
              learnings={learnings}
              futureImprovements={futureImprovements}
            />
            <div className="mt-12 mb-24" />
          </>
        )}
      </DetailShell>

      {viewerIndex != null && (
        <ImageViewerModal
          images={selectedProject.details.images}
          initialIndex={viewerIndex}
          onClose={() => {
            setViewerIndex(null);
            closeModal();
          }}
        />
      )}

      {selectedTechnicalIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">기술 이슈 해결 과정</h2>
              <button
                onClick={() => setSelectedTechnicalIssue(null)}
                className="text-white/80 hover:text-white transition-colors text-2xl font-light"
              >
                ✕
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)] bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              {(() => {
                const issue = TECHNICAL_ISSUES.find(
                  (p) => p.id === selectedTechnicalIssue,
                );
                return issue ? <TechnicalIssueDetail issue={issue} /> : null;
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
