"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import DemoMedia from "@/components/projects/detail/DemoMedia";
import type { MediaTabsProps } from "@interfaces/projectDetail";

const MediaTabs = ({ project, screenshots, hasDemo, activeTab, onChangeTab, onOpenViewer, onPreload }: MediaTabsProps) => {
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
        {hasDemo && (
          <button
            type="button"
            onClick={() => onChangeTab("demo")}
            className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
              activeTab === "demo"
                ? "bg-primary text-white border-primary"
                : "bg-gray-100 dark:bg-gray-800 text-text-secondary border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Demo
          </button>
        )}
      </div>

      {/* Tab Panels */}
      {activeTab === "screenshots" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {screenshots.map((image, index) => (
            <div
              key={index}
              className="group relative h-[360px] cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => onOpenViewer(index)}
              onMouseEnter={() => onPreload(image.url)}
            >
              <Image
                src={image.url}
                alt={image.description || ""}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={100}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "demo" && hasDemo && (
        <div className="aspect-video w-full h-full rounded-xl overflow-hidden shadow-lg">
          <DemoMedia project={project} />
        </div>
      )}
    </motion.div>
  );
};

export default MediaTabs;


