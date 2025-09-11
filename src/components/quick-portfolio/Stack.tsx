import { cn } from '@/utils/helpers/cn';

import { coreStacks } from '@/constants/quick-portfolio/stack';

export default function Stack() {
  const stacks = coreStacks;
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        CORE STACK
      </h3>
      <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
        {stacks.map((t) => (
          <span
            key={t}
            className={cn(
              'px-2.5 py-1 rounded-full border border-border/40 hover:border-border/60 dark:border-border/40 dark:hover:border-border/60',
              'bg-white/60 dark:bg-black/20 text-text-secondary/60 hover:text-text-primary/80 font-pret shadow-sm hover:shadow-md transition-all duration-200',
              'hover:bg-gray-50/50 dark:hover:bg-gray-900/20',
              'cursor-default font-pret',
            )}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
