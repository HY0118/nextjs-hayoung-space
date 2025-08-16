'use client';

import Image from 'next/image';

import { cn } from '@/lib/cn';

import type { ScreenshotGridProps } from '@/interfaces/projectDetail';

const ScreenshotGrid = ({
  screenshots,
  onOpenViewer,
  onPreload,
}: ScreenshotGridProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto py-1">
      {screenshots.map((image, index) => (
        <div
          key={index}
          className={cn(
            'relative group flex-shrink-0',
            'w-[200px] h-[180px] rounded-xl overflow-hidden shadow-md',
            'bg-gray-100 dark:bg-gray-900',
            'cursor-pointer hover:cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
            'border border-gray-200 dark:border-gray-700',
          )}
          onClick={() => onOpenViewer(index)}
          onMouseEnter={() => onPreload(image.url)}
          aria-label={image.description || 'Screenshot'}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onOpenViewer(index);
          }}
        >
          <Image
            src={image.url}
            alt={image.description || ''}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="200px"
            quality={90}
          />
          <div
            className={cn(
              'absolute inset-0 bg-black/40 opacity-0',
              'group-hover:opacity-100 transition-opacity duration-300',
              'flex items-center justify-center cursor-pointer',
            )}
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScreenshotGrid;
