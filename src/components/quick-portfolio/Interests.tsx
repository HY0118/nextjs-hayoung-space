export default function Interests() {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold tracking-[0.2em] text-text-secondary/80 font-pret">
        INTERESTS
      </h3>
      <ul className="mt-2 space-y-1 text-text-primary text-base font-pret list-disc list-inside">
        <li>상태 모델링(Statechart) · 복잡 UI 흐름 설계</li>
        <li>관측성(Tracing/Profiling) · Web Vitals 기반 성능 개선</li>
        <li>데이터 중심 UI(JSON Schema) · 폼/도큐먼트 자동화</li>
      </ul>
    </div>
  );
}
