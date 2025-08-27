import { cultureItems } from '@/constants/quick-portfolio/culture';

export default function Culture() {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        DEV CULTURE
      </h3>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
        {cultureItems.map((it) => (
          <div
            key={it.title}
            className="rounded-lg border border-border/40 p-3 bg-white/60 dark:bg-black/20 shadow-sm"
          >
            <div className="font-semibold text-text-primary font-pret">{it.title}</div>
            <p className="text-text-secondary mt-0.5 leading-snug font-pret">
              {it.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
