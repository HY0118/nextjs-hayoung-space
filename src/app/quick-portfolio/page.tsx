import Image from "next/image";
import Link from "next/link";
import BookPaginator from "@/components/client/BookPaginator";

export const revalidate = 60;

export default function QuickPortfolioPage() {
  const employment = [
    { start: "2022.04", end: "현재", company: "마이다스아이티", dept: "RPM개발팀", position: "프로" },
    { start: "2019.10", end: "2022.04", company: "인피니트헬스케어", dept: "연구개발1본부", position: "연구원" },
    { start: "2019.07", end: "2019.09", company: "인피니트헬스케어", dept: "연구개발1본부", position: "인턴" },
  ];

  const formatDate = (date: string) => (date === "현재" ? date : date.replace(/^20/, ""));
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

          <BookPaginator
            className=""
            columnClassName=""
            hints={{
              // 왼쪽 페이지에 INTERESTS까지 포함하고 이후 오른쪽으로 전환
              columnBreakAfter: ["interests"],
              // 필요 시 스프레드 전환: TALKS 이후 다음 스프레드로
              spreadBreakAfter: ["talks"],
            }}
            debug
            blocks={[
              /* Left: Header + EMPLOYMENT */
              (
                <div key="profile">
                <div className="flex items-start gap-8">
                <div className="relative w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden">
                  <Image src="/images/hayoung.jpg" alt="Profile" fill className="object-cover" sizes="160px" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-text-primary font-sora">이하영 · 프론트엔드 개발자</h2>
                  <p className="text-text-secondary mt-2 font-pret">사용자 경험 중심 · React, Next.js, TypeScript</p>

                  {/* EMPLOYMENT */}
                  <div className="mt-4">
                    <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">EMPLOYMENT</h3>
                    <ul className="mt-2 grid grid-cols-[100px_minmax(150px,1fr)_minmax(160px,1fr)_auto] md:grid-cols-[120px_minmax(190px,1fr)_minmax(190px,1fr)_auto] gap-x-3 md:gap-x-4 gap-y-2 text-sm md:text-base font-pret">
                      {employment.map((item) => (
                        <li key={`${item.company}-${item.start}`} className="contents whitespace-nowrap">
                          <div className="grid grid-cols-[1fr_12px_1fr] md:grid-cols-[1fr_14px_1fr] items-center tabular-nums text-text-primary font-medium">
                            <span className="text-right">{formatDate(item.start)}</span>
                            <span className="text-text-secondary text-center" aria-hidden>–</span>
                            <span className="text-left">{formatDate(item.end)}</span>
                          </div>
                          <span className="text-text-primary">{item.company}</span>
                          <span className="text-text-primary">{item.dept}</span>
                          <span className="text-text-primary">{item.position}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                </div>
                </div>
              ),
              // Recent Roles
              (
                <div key="recent-roles" className="mt-10">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">RECENT ROLES</h3>
                  <ul className="mt-3 space-y-2 text-text-primary font-pret">
                    <li>모티브 · 프론트엔드 개발자 (20XX - 20XX)</li>
                    <li>프로덕트 기능 설계/에디터 · 내부 UI 라이브러리</li>
                  </ul>
                </div>
              ),
              // What I Bring
              (
                <div key="what-i-bring" className="mt-6">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">WHAT I BRING</h3>
                  <ul className="mt-3 space-y-2 text-text-primary list-disc list-inside font-pret">
                    <li>React/TS 기반 사용자 여정 인터랙션 설계</li>
                    <li>복잡한 UI 상태 관리와 성능 최적화 (메모리/렌더링)</li>
                    <li>디자인-개발 협업 환경 정비 및 문서화</li>
                  </ul>
                </div>
              ),
              // Impact
              (
                <div key="impact" className="mt-6">
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
              ),
              // Collab Style
              (
                <div key="collab-style" className="mt-6">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">COLLAB STYLE</h3>
                  <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-text-primary font-pret">
                    <div className="rounded-xl border border-border/40 p-3">
                      <div className="font-medium">Design ↔ Dev 핸드오프</div>
                      <p className="text-text-secondary mt-1">Figma Variants · Tokens → Storybook 문서화 · 컴포넌트 계약서</p>
                    </div>
                    <div className="rounded-xl border border-border/40 p-3">
                      <div className="font-medium">품질 루프</div>
                      <p className="text-text-secondary mt-1">PR 템플릿 · Chromatic 시각 회귀 · Playwright E2E · Sentry 트레이싱</p>
                    </div>
                  </div>
                </div>
              ),
              // Tooling
              (
                <div key="tooling" className="mt-6">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">TOOLING</h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {[
                      "pnpm",
                      "turbo",
                      "Vite",
                      "Next Image",
                      "Zustand",
                      "Jotai",
                      "Storybook",
                      "Jest",
                      "Playwright",
                      "ESLint",
                      "Prettier",
                      "Zod",
                    ].map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full border border-border/40 bg-gray-50 dark:bg-gray-900/30 text-text-secondary">{t}</span>
                    ))}
                  </div>
                </div>
              ),
              // Interests
              (
                <div key="interests" className="mt-6">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">INTERESTS</h3>
                  <ul className="mt-3 space-y-1 text-text-secondary text-sm font-pret list-disc list-inside">
                    <li>실시간 협업 인터랙션, 옵티미스틱 UI</li>
                    <li>디자인 시스템, 접근성 · 반응형 타이포그래피</li>
                    <li>프론트엔드 관측성(Tracing/Profiling)</li>
                  </ul>
                </div>
              ),

              /* Right: Projects */
              (
                <div key="projects">
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
              ),

              (
                <div key="stack" className="mt-10">
                  <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">핵심 기술 스택</h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  {["React", "TypeScript", "Next.js", "Zustand", "Framer Motion", "TailwindCSS"].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full border border-border/40 bg-gray-50 dark:bg-gray-900/30 text-text-secondary">{t}</span>
                  ))}
                  </div>
                </div>
              ),

              /* Dev culture */
              (
                <div key="culture" className="mt-10">
                  <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">개발 문화</h3>
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                  <div className="rounded-xl border border-border/40 p-4">
                    <div className="font-semibold text-text-primary">코드리뷰</div>
                    <p className="text-text-secondary mt-1">PR 기준 · 체크리스트 · 스크린샷/동영상 첨부</p>
                  </div>
                  <div className="rounded-xl border border-border/40 p-4">
                    <div className="font-semibold text-text-primary">테스트</div>
                    <p className="text-text-secondary mt-1">Storybook Interaction · 단위/통합/E2E</p>
                  </div>
                  <div className="rounded-xl border border-border/40 p-4">
                    <div className="font-semibold text-text-primary">관측성</div>
                    <p className="text-text-secondary mt-1">Sentry 성능 이슈 트레이싱 · Web Vitals 모니터링</p>
                  </div>
                  </div>
                </div>
              ),

              (
                <div key="talks" className="mt-10">
                  <h3 className="text-xl md:text-2xl font-semibold text-text-primary font-sora">글/발표</h3>
                  <ul className="mt-4 space-y-2 text-sm text-text-secondary font-pret">
                  <li>디자인 시스템에서 상태 기계(Statechart)로 인터랙션 모델링</li>
                  <li>대규모 테이블 렌더링 최적화: 가상 스크롤과 메모리 패턴</li>
                  <li>팀 온보딩을 위한 UI 프로토콜: Props, Tokens, Contracts</li>
                  </ul>
                </div>
              ),

              (
                <div key="oss" className="mt-10">
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
              )
            ]}
          />

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
