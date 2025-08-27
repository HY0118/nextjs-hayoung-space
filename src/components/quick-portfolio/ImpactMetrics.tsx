export default function ImpactMetrics() {
  const metrics: { value: string; label: string }[] = [
    { value: '2,000+', label: '월 활성 사용자(MAU)' },
    { value: '50%', label: 'Google Organic 유입 비율' },
    { value: '80%', label: '레이아웃 정돈 시간 절감(오토레이아웃)' },
    { value: '>60FPS', label: '드래그/연결 인터랙션 안정화' },
  ];

  return (
    <div className="mt-3">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        IMPACT
      </h3>
      <ul className="mt-1.5 grid grid-cols-2 md:grid-cols-4 gap-1.5 text-text-primary font-pret">
        {metrics.map((m) => (
          <li
            key={`${m.value}-${m.label}`}
            className="rounded-md border border-border/40 px-2 py-1.5"
          >
            <div className="text-sm md:text-base font-bold text-primary leading-none font-pret">
              {m.value}
            </div>
            <div className="text-[10px] text-text-secondary mt-0.5 leading-tight line-clamp-2 font-pret">
              {m.label}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
