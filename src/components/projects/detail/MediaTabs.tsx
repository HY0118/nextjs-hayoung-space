"use client";

import { motion } from "framer-motion";
import VideoGifMedia from "@/components/projects/detail/VideoGifMedia";
import ScreenshotGrid from "@/components/projects/detail/ScreenshotGrid";
import type { MediaTabsProps } from "@/interfaces/projectDetail";

const MediaTabs = ({ project, screenshots, hasVideoOrGif, activeTab, onChangeTab, onOpenViewer, onPreload }: MediaTabsProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-text-primary font-sora">Media</h4>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChangeTab("screenshots")}
          className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
            activeTab === "screenshots"
              ? "bg-primary text-white border-primary"
              : "bg-gray-100 dark:bg-gray-800 text-text-secondary border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Screenshots
        </button>
        {hasVideoOrGif && (
          <button
            type="button"
            onClick={() => onChangeTab("video")}
            className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
              activeTab === "video"
                ? "bg-primary text-white border-primary"
                : "bg-gray-100 dark:bg-gray-800 text-text-secondary border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-label="Video or GIF"
            title="Video/GIF"
          >
            Video/GIF
          </button>
        )}
      </div>

      {/* Tab Panels */}
      {activeTab === "screenshots" && (
        <ScreenshotGrid screenshots={screenshots} onOpenViewer={onOpenViewer} onPreload={onPreload} />
      )}
      {activeTab === "video" && hasVideoOrGif && (
        <div className="aspect-video w-full h-full rounded-xl overflow-hidden shadow-lg">
          <VideoGifMedia project={project} />
        </div>
      )}
    </motion.div>
  );
};

export default MediaTabs;


