export default function CollabStyle() {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        COLLAB STYLE
      </h3>
      <div className="mt-1.5 grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-text-primary font-pret">
        <div className="rounded-md border border-border/40 px-2 py-1.5">
          <div className="font-medium text-sm">Design ↔ Dev 핸드오프</div>
          <p className="text-text-secondary mt-0.5 leading-tight">
            Figma Variants/토큰 → Storybook 문서화 · 컴포넌트 계약서
          </p>
        </div>
        <div className="rounded-md border border-border/40 px-2 py-1.5">
          <div className="font-medium text-sm">품질 루프</div>
          <p className="text-text-secondary mt-0.5 leading-tight">
            PR 템플릿 · Chromatic 회귀 · Playwright E2E · Sentry 트레이싱
          </p>
        </div>
      </div>
    </div>
  );
}
