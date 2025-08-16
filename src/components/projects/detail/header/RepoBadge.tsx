'use client';

const RepoBadge = ({ github }: { github?: string }) => {
  if (github) {
    return (
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-2 rounded-lg flex items-center justify-center
          text-text-primary hover:text-text-primary-dark border border-gray-200 dark:border-gray-700
          hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600
          transition-all duration-200"
        aria-label="GitHub Repository"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 98 96"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="currentColor"
          />
        </svg>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          <span className="font-semibold text-primary">Public</span> GitHub Repository
        </div>
      </a>
    );
  }

  return (
    <div
      className="group relative p-2 rounded-lg flex items-center justify-center
      text-text-secondary/70 cursor-not-allowed border border-gray-200 dark:border-gray-700
      hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
    >
      <svg
        className="w-6 h-6 opacity-70"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891H.778zM14.52 15.53H9.522L8.17 8.466h7.561l-1.211 7.064z"
          fill="currentColor"
        />
      </svg>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
        <span className="font-semibold text-gray-400">Private</span> Bitbucket Repository
      </div>
    </div>
  );
};

export default RepoBadge;
