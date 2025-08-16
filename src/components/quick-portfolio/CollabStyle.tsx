export default function CollabStyle() {
  return (
    <div className="mt-6">
      <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">
        COLLAB STYLE
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-text-primary font-pret">
        <div className="rounded-xl border border-border/40 p-3">
          <div className="font-medium">Design ↔ Dev 핸드오프</div>
          <p className="text-text-secondary mt-1">
            Figma Variants · Tokens → Storybook 문서화 · 컴포넌트 계약서
          </p>
        </div>
        <div className="rounded-xl border border-border/40 p-3">
          <div className="font-medium">품질 루프</div>
          <p className="text-text-secondary mt-1">
            PR 템플릿 · Chromatic 시각 회귀 · Playwright E2E · Sentry 트레이싱
          </p>
        </div>
      </div>
    </div>
  );
}
