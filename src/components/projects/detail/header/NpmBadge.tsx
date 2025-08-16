'use client';

const NpmBadge = ({ npm }: { npm?: string }) => {
  if (!npm) return null;
  return (
    <a
      href={npm}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-2 rounded-lg flex items-center justify-center
        text-[#CB3837] hover:text-[#AB2B2A] border border-gray-200 dark:border-gray-700
        hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600
        transition-all duration-200"
      aria-label="NPM Package"
    >
      <svg
        className="w-7 h-7"
        viewBox="0 0 576 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"
          fill="currentColor"
        />
      </svg>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
        <span className="font-semibold text-red-400">NPM</span> Package
      </div>
    </a>
  );
};

export default NpmBadge;
