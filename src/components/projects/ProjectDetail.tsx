"use client";

// import { motion } from "framer-motion";
import { useProjectStore } from "@store/projectStore";
import { useState, useEffect, useCallback } from "react";
// import { getLocaleFromPathname, withTrailingSlash } from "@/lib/urlUtils";
import Overview from "@/components/projects/detail/Overview";
import Achievements from "@/components/projects/detail/Achievements";
import TechChips from "@/components/projects/detail/TechChips";
import KeyFeatures from "@/components/projects/detail/KeyFeatures";
import MediaTabs from "@/components/projects/detail/MediaTabs";
import DividerToggle from "@/components/projects/detail/DividerToggle";
import OptionalDetails from "@/components/projects/detail/OptionalDetails";
import ImageViewerModal from "@/components/projects/detail/ImageViewerModal";
import HeaderActions from "@/components/projects/detail/HeaderActions";
import { useProjectDerivedData } from "@/hooks/useProjectDerivedData";
import { usePreloadScreenshots } from "@/hooks/usePreloadScreenshots";
import { useModalVisibility } from "@/hooks/useModalVisibility";
import DetailShell from "@/components/projects/detail/DetailShell";
import { createCloseProjectDetailHandler } from "@/lib/detailHandlers";
import { PROJECT_DETAIL_CONFIG } from "@/constants/projectDetailConfig";

const ProjectDetail = () => {
  const { selectedProject, closeDetail, setSelectedProject } = useProjectStore();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<"screenshots" | "demo">(PROJECT_DETAIL_CONFIG.media.defaultActiveTab);
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

  const handleClose = createCloseProjectDetailHandler({ closeDetail, setSelectedProject, closeModal });
  const { achievements, features, performance, learnings, futureImprovements, screenshots, hasDemo } = useProjectDerivedData(selectedProject);
  usePreloadScreenshots(selectedProject?.details.images ?? [], 2);

  if (!selectedProject) return null;

  return (
    <>
      <DetailShell
        header={<HeaderActions project={selectedProject} onClose={handleClose} />}
        marginTop={PROJECT_DETAIL_CONFIG.layout.marginTop}
        backgroundClassName={PROJECT_DETAIL_CONFIG.layout.backgroundClassName}
        headerPaddingClassName={PROJECT_DETAIL_CONFIG.layout.headerPaddingClassName}
        contentPaddingClassName={PROJECT_DETAIL_CONFIG.layout.contentPaddingClassName}
        maxWidthClassName={PROJECT_DETAIL_CONFIG.layout.maxWidthClassName}
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
          hasDemo={hasDemo}
          activeTab={activeMediaTab}
          onChangeTab={setActiveMediaTab}
          onOpenViewer={handleOpenViewer}
          onPreload={preloadImage}
        />

        {/* Divider toggle for more details */}
        <DividerToggle expanded={showDetails} onToggle={() => setShowDetails((v) => !v)} />

        {showDetails && (
          <OptionalDetails
            problemStatement={selectedProject.details.problemStatement}
            solutionApproach={selectedProject.details.solutionApproach}
            performance={performance}
            architecture={selectedProject.details.architecture}
            learnings={learnings}
            futureImprovements={futureImprovements}
          />
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
