'use client';

import { AnimatePresence, motion } from 'framer-motion';

import ScreenshotGrid from '@/components/projects/detail/ScreenshotGrid';
import VideoGifMedia from '@/components/projects/detail/VideoGifMedia';

import type { MediaTabsProps } from '@/interfaces/projectDetail';

const MediaTabs = ({
  project,
  screenshots,
  hasVideoOrGif,
  activeTab,
  onChangeTab,
  onOpenViewer,
  onPreload,
}: MediaTabsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-12"
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-text-primary font-sora">Media</h4>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChangeTab('screenshots')}
          className={`px-3 py-1.5 rounded-md text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
            activeTab === 'screenshots'
              ? 'bg-primary text-white border-primary shadow-sm'
              : 'bg-gray-50 dark:bg-gray-900/40 text-black dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.04)]'
          }`}
        >
          Screenshots
        </button>
        {hasVideoOrGif && (
          <button
            type="button"
            onClick={() => onChangeTab('video')}
            className={`px-3 py-1.5 rounded-md text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
              activeTab === 'video'
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-gray-50 dark:bg-gray-900/40 text-black dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.04)]'
            }`}
            aria-label="Video"
            title="Video"
          >
            Video
          </button>
        )}
      </div>

      {/* Tab Panels with symmetric transition */}
      <AnimatePresence mode="wait">
        {activeTab === 'screenshots' && (
          <motion.div
            key="screenshots"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ScreenshotGrid
              screenshots={screenshots}
              onOpenViewer={onOpenViewer}
              onPreload={onPreload}
            />
          </motion.div>
        )}
        {activeTab === 'video' && hasVideoOrGif && (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="aspect-video w-full h-full rounded-xl overflow-hidden shadow-lg"
          >
            <VideoGifMedia project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MediaTabs;
