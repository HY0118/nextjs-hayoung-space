"use client";

import type { DividerToggleProps } from "@interfaces/projectDetail";

const DividerToggle = ({ expanded, onToggle }: DividerToggleProps) => {
  const lineClass = expanded
    ? "flex-1 h-[2px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
    : "flex-1 h-[2px] bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200 dark:from-sky-700 dark:via-sky-600 dark:to-sky-700";

  return (
    <div className={`flex items-center gap-4 ${expanded ? "my-10" : "mt-10 mb-28"}`}>
      <div className={lineClass} />
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className="px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium text-primary dark:text-primary bg-primary/10 dark:bg-primary/10 border border-primary/30 hover:bg-primary/15 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        {expanded ? "hide" : "more"}
      </button>
      <div className={lineClass} />
    </div>
  );
};

export default DividerToggle;


