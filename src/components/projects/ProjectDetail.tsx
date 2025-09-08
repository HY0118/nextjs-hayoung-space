'use client';

// import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from 'react';

import { createCloseProjectDetailHandler } from '@/utils/handlers/detail';

import Achievements from '@/components/projects/detail/Achievements';
import DetailShell from '@/components/projects/detail/DetailShell';
import DividerToggle from '@/components/projects/detail/DividerToggle';
import HeaderActions from '@/components/projects/detail/HeaderActions';
import ImageViewerModal from '@/components/projects/detail/ImageViewerModal';
import KeyFeatures from '@/components/projects/detail/KeyFeatures';
import MediaTabs from '@/components/projects/detail/MediaTabs';
import OptionalDetails from '@/components/projects/detail/OptionalDetails';
// import { getLocaleFromPathname, withTrailingSlash } from "@/utils/urlUtils";
import Overview from '@/components/projects/detail/Overview';
import TechChips from '@/components/projects/detail/TechChips';

import { useModalVisibility } from '@/hooks/useModalVisibility';
import { usePreloadScreenshots } from '@/hooks/usePreloadScreenshots';
import { useProjectDerivedData } from '@/hooks/useProjectDerivedData';

import { useProjectStore } from '@/store/projectStore';

import { PROJECT_DETAIL_CONFIG } from '@/constants/projectDetailConfig';

import type { MediaTab, ProjectDetailProps } from '@/interfaces/projectDetail';

const ProjectDetail = ({ variant: propVariant = 'panel' }: ProjectDetailProps) => {
  const { selectedProject, closeDetail, setSelectedProject } = useProjectStore();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<MediaTab>(
    PROJECT_DETAIL_CONFIG.media.defaultActiveTab,
  );
  const { open: openModal, close: closeModal } = useModalVisibility();

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
        {/* Essentials: Overview */}
        <Overview text={selectedProject.details.overview} />

        {/* Essentials: Achievements (≤3) */}
        <Achievements items={achievements} />

        {/* Essentials: Tech chips */}
        <TechChips tech={selectedProject.tech} />

        {/* Essentials: Key Features (≤3, compact) */}
        <KeyFeatures features={features} />

        {/* Essentials: Media (Screenshots / Demo Tabs) */}
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
              performance={performance}
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
    </>
  );
};

export default ProjectDetail;
