export default function Stack() {
  const stacks = ["React", "TypeScript", "Next.js", "Zustand", "Framer Motion", "TailwindCSS"];
  return (
    <div className="mt-10">
      <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">핵심 기술 스택</h3>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {stacks.map((t) => (
          <span key={t} className="px-3 py-1 rounded-full border border-border/40 bg-gray-50 dark:bg-gray-900/30 text-text-secondary">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}


