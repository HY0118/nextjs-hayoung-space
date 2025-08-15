import { toolingList } from "@/constants/quick-portfolio/tooling";

export default function Tooling() {
  const tools = toolingList;

  return (
    <div className="mt-6">
      <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">TOOLING</h3>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {tools.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full border border-border/40 bg-gray-50 dark:bg-gray-900/30 text-text-secondary">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}


