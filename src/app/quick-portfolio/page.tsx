import BookPaginator from '@/components/client/BookPaginator';
import LanguageDropdown from '@/components/common/LanguageDropdown';
import LocaleLink from '@/components/common/LocaleLink';
import CollabStyle from '@/components/quick-portfolio/CollabStyle';
import Culture from '@/components/quick-portfolio/Culture';
import ImpactMetrics from '@/components/quick-portfolio/ImpactMetrics';
import Interests from '@/components/quick-portfolio/Interests';
import OSS from '@/components/quick-portfolio/OSS';
import Profile from '@/components/quick-portfolio/Profile';
import Projects from '@/components/quick-portfolio/Projects';
import RecentRoles from '@/components/quick-portfolio/RecentRoles';
import Stack from '@/components/quick-portfolio/Stack';
import Talks from '@/components/quick-portfolio/Talks';
import Tooling from '@/components/quick-portfolio/Tooling';
import WhatIBring from '@/components/quick-portfolio/WhatIBring';

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

          <BookPaginator
            className=""
            columnClassName=""
            hints={{
              // 왼쪽 페이지에 INTERESTS까지 포함하고 이후 오른쪽으로 전환
              columnBreakAfter: ['interests'],
              // 필요 시 스프레드 전환: TALKS 이후 다음 스프레드로
              spreadBreakAfter: ['talks'],
            }}
            debug
            blocks={[
              <Profile key="profile" />,
              <RecentRoles key="recent-roles" />,
              <WhatIBring key="what-i-bring" />,
              <ImpactMetrics key="impact" />,
              <CollabStyle key="collab-style" />,
              <Tooling key="tooling" />,
              <Interests key="interests" />,
              <Projects key="projects" />,
              <Stack key="stack" />,
              <Culture key="culture" />,
              <Talks key="talks" />,
              <OSS key="oss" />,
            ]}
          />

          {/* 고정형 CTA 버튼 */}
        </div>

        {/* 고정형 CTA + Language */}
        <div className="fixed top-6 right-6 z-10 flex items-center gap-3">
          <LanguageDropdown />
          <LocaleLink
            to="/#about"
            className="px-4 py-2 rounded-lg border border-border/40 bg-background/80 backdrop-blur text-text-primary hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors font-sora shadow"
          >
            홈으로
          </LocaleLink>
        </div>
      </section>
    </main>
  );
}
