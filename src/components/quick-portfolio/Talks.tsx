export default function Talks() {
  return (
    <div className="mt-10">
      <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">글/발표</h3>
      <ul className="mt-4 space-y-2 text-sm text-text-secondary font-pret">
        <li>디자인 시스템에서 상태 기계(Statechart)로 인터랙션 모델링</li>
        <li>대규모 테이블 렌더링 최적화: 가상 스크롤과 메모리 패턴</li>
        <li>팀 온보딩을 위한 UI 프로토콜: Props, Tokens, Contracts</li>
      </ul>
    </div>
  );
}


