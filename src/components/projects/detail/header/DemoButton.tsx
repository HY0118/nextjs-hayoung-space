"use client";

import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon";

const DemoButton = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative p-2 rounded-lg flex items-center justify-center
      text-primary hover:text-primary-dark border border-gray-200 dark:border-gray-700
      hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600
      transition-all duration-200"
    aria-label="Try demo"
  >
    <ExternalLinkIcon className="w-6 h-6" />
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
      Try it out
    </div>
  </a>
);

export default DemoButton;


