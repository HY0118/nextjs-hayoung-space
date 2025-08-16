export default function Culture() {
  return (
    <div className="mt-10">
      <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">
        개발 문화
      </h3>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
        <div className="rounded-xl border border-border/40 p-4">
          <div className="font-semibold text-text-primary">코드리뷰</div>
          <p className="text-text-secondary mt-1">
            PR 기준 · 체크리스트 · 스크린샷/동영상 첨부
          </p>
        </div>
        <div className="rounded-xl border border-border/40 p-4">
          <div className="font-semibold text-text-primary">테스트</div>
          <p className="text-text-secondary mt-1">
            Storybook Interaction · 단위/통합/E2E
          </p>
        </div>
        <div className="rounded-xl border border-border/40 p-4">
          <div className="font-semibold text-text-primary">관측성</div>
          <p className="text-text-secondary mt-1">
            Sentry 성능 이슈 트레이싱 · Web Vitals 모니터링
          </p>
        </div>
      </div>
    </div>
  );
}
