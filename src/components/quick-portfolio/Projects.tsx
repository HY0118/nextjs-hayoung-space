'use client';

import { useProjectStore } from '@/store/projectStore';

import { cn } from '@/lib/cn';

import { motiveDesignEditor, motiveTools } from '@/constants/projects';

export default function Projects() {
  const featured = [motiveTools, motiveDesignEditor];
  const { setSelectedProject, openDetail } = useProjectStore();

  const handleOpen = (project: (typeof featured)[number]) => {
    setSelectedProject(project);
    openDetail('modal');
  };

  return (
    <div className="relative">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        FEATURED PROJECTS
      </h3>
      <div className="mt-3 mr-1 space-y-3 ">
        {featured.map((p) => (
          <div
            key={p.id}
            className={cn(
              'group rounded-2xl border-2 border-blue-100 hover:border-blue-300 dark:border-blue-900 dark:hover:border-blue-700',
              'focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800',
              'p-5 cursor-pointer bg-white/60 dark:bg-black/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5',
            )}
            onClick={() => handleOpen(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleOpen(p);
            }}
          >
            <div className="text-sm font-semibold text-text-primary font-sora">
              {p.title}
            </div>
            <div className="mt-1 text-sm text-text-secondary/90 leading-snug line-clamp-2 font-pret">
              {(p.details?.overview || p.description).slice(0, 80)}
              {(p.details?.overview || p.description).length > 80 ? '…' : ''}
            </div>
            <ul className="mt-2 text-xs text-text-secondary/80 list-disc list-inside font-pret space-y-0.5">
              {(p.details?.achievements || []).slice(0, 2).map((a) => (
                <li
                  key={a.label}
                  className="font-pret"
                >
                  <span className="text-text-primary/90 font-medium">{a.value}</span>
                  <span className="mx-1 text-text-secondary/50">·</span>
                  {a.label}
                </li>
              ))}
              {(!p.details?.achievements || p.details.achievements.length === 0) &&
              p.details?.features?.[0] ? (
                <li
                  key={`${p.id}-feature`}
                  className="text-text-secondary/80 font-pret"
                >
                  {p.details.features[0].description}
                </li>
              ) : null}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
