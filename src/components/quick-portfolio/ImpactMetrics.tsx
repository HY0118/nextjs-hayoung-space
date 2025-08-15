export default function ImpactMetrics() {
  return (
    <div className="mt-6">
      <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">IMPACT (METRICS)</h3>
      <ul className="mt-3 grid grid-cols-2 gap-3 text-text-primary font-pret">
        <li className="rounded-xl border border-border/40 p-3">
          <div className="text-2xl font-bold text-primary">65%</div>
          <div className="text-xs text-text-secondary mt-1">워크플로우 실행 속도 개선</div>
        </li>
        <li className="rounded-xl border border-border/40 p-3">
          <div className="text-2xl font-bold text-primary">40%</div>
          <div className="text-xs text-text-secondary mt-1">메모리 사용량 절감</div>
        </li>
      </ul>
    </div>
  );
}


