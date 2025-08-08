import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default function QuickPortfolioPage() {
  return (
    <main className="h-dvh w-screen overflow-hidden bg-background">
      <section className="relative h-full w-full">
        {/* 배경과 페이지 패딩 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[35vw] h-[35vw] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,transparent_50%)] pointer-events-none" />
        </div>

        {/* 페이지 콘텐츠: 책 페이지처럼 전체 화면에 패딩 적용 */}
        <div className="h-full w-full px-5 sm:px-8 md:px-12 lg:px-16 py-8 md:py-10 lg:py-12">
          {/* 중앙 절취선 (점선) */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dashed border-border/70" />

          <div className="grid h-full w-full grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Page */}
            <div className="h-full overflow-y-auto pr-2 md:pr-6">
              <div className="flex items-start gap-8">
                <div className="relative w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden">
                  <Image src="/images/hayoung.jpg" alt="Profile" fill className="object-cover" sizes="160px" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-text-primary font-sora">이하영 · 프론트엔드 개발자</h2>
                  <p className="text-text-secondary mt-2 font-pret">사용자 경험 중심 · React, TypeScript</p>

                  {/* EMPLOYMENT */}
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">EMPLOYMENT</h3>
                    <ul className="mt-2 space-y-1 text-sm md:text-base font-pret">
                      <li className="flex flex-wrap gap-2"><span className="font-medium text-text-primary min-w-[130px]">2022.04 - 현재</span><span className="text-text-primary">마이다스아이티 · RPM개발팀 · 프로</span></li>
                      <li className="flex flex-wrap gap-2"><span className="font-medium text-text-primary min-w-[130px]">2019.10 - 2022.04</span><span className="text-text-primary">인피니트헬스케어 · 연구개발1본부 · 연구원</span></li>
                      <li className="flex flex-wrap gap-2"><span className="font-medium text-text-primary min-w-[130px]">2019.07 - 2019.09</span><span className="text-text-primary">인피니트헬스케어 · 연구개발1본부 · 인턴</span></li>
                    </ul>
                  </div>
                </div>
              </div>


              <div className="mt-10 space-y-7">
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">RECENT ROLES</h3>
                  <ul className="mt-3 space-y-2 text-text-primary font-pret">
                    <li>모티브 · 프론트엔드 개발자 (20XX - 20XX)</li>
                    <li>프로덕트 기능 설계/에디터 · 내부 UI 라이브러리</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">WHAT I BRING</h3>
                  <ul className="mt-3 space-y-2 text-text-primary list-disc list-inside font-pret">
                    <li>React/TS 기반 사용자 여정 인터랙션 설계</li>
                    <li>복잡한 UI 상태 관리와 성능 최적화 (메모리/렌더링)</li>
                    <li>디자인-개발 협업 환경 정비 및 문서화</li>
                  </ul>
                </div>

                <div>
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
              </div>
            </div>

            {/* Right Page */}
            <div className="h-full overflow-y-auto pl-2 md:pl-6">
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

              <div className="mt-10">
                <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">핵심 기술 스택</h3>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  {["React", "TypeScript", "Next.js", "Zustand", "Framer Motion", "TailwindCSS"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full border border-border/40 bg-gray-50 dark:bg-gray-900/30 text-text-secondary">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 고정형 CTA 버튼 */}
        </div>

        {/* 고정형 CTA */}
        <div className="fixed bottom-6 right-6 z-10">
            <Link href="/#about" className="px-4 py-2 rounded-lg border border-border/40 bg-background/80 backdrop-blur text-text-primary hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors font-sora shadow">
                홈으로
            </Link>
        </div>
      </section>
    </main>
  );
}
