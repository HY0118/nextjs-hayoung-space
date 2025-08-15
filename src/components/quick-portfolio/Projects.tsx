export default function Projects() {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">대표 프로젝트</h3>
      <div className="mt-5 space-y-5">
        <div className="rounded-2xl border border-border/40 p-5 hover:shadow-md transition-shadow">
          <div className="text-sm text-text-secondary">Design Editor</div>
          <div className="font-semibold text-text-primary mt-1">복수 설계 컨텐츠 연결, 통합 모델링 사용자 페이지</div>
          <ul className="mt-2 text-sm text-text-secondary list-disc list-inside font-pret">
            <li>병렬 처리/캐싱으로 실행속도 65% 개선</li>
            <li>대규모 데이터 메모리 최적화 40%</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border/40 p-5 hover:shadow-md transition-shadow">
          <div className="text-sm text-text-secondary">moaUI Design System</div>
          <div className="font-semibold text-text-primary mt-1">사내 UI 시스템 및 플러그인</div>
          <ul className="mt-2 text-sm text-text-secondary list-disc list-inside font-pret">
            <li>컴포넌트/토큰 표준화, 플러그인 배포</li>
            <li>개발-디자인 협업 효율화</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


