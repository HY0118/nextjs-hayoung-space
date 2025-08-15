export default function OSS() {
  return (
    <div className="mt-10">
      <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">오픈소스</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-border/40 p-4">
          <div className="font-semibold text-text-primary">react-aria-kit</div>
          <p className="text-text-secondary mt-1">접근성 훅/컴포넌트 유틸 · 키보드 내비게이션</p>
        </div>
        <div className="rounded-xl border border-border/40 p-4">
          <div className="font-semibold text-text-primary">tailwind-motion-presets</div>
          <p className="text-text-secondary mt-1">모션 프리셋/유틸리티 컬렉션</p>
        </div>
      </div>
    </div>
  );
}


