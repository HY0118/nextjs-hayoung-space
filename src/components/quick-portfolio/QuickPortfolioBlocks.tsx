'use client';

import dynamic from 'next/dynamic';

import BookPaginator from '@/components/client/BookPaginator';
import LanguageDropdown from '@/components/common/LanguageDropdown';
import LocaleLink from '@/components/common/LocaleLink';

import { cn } from '@/utils/cn';

const Profile = dynamic(() => import('@/components/quick-portfolio/Profile'), {
  ssr: false,
  loading: () => null,
});
const RecentRoles = dynamic(() => import('@/components/quick-portfolio/RecentRoles'), {
  ssr: false,
  loading: () => null,
});
const WhatIBring = dynamic(() => import('@/components/quick-portfolio/WhatIBring'), {
  ssr: false,
  loading: () => null,
});
const ImpactMetrics = dynamic(
  () => import('@/components/quick-portfolio/ImpactMetrics'),
  {
    ssr: false,
    loading: () => null,
  },
);
const CollabStyle = dynamic(() => import('@/components/quick-portfolio/CollabStyle'), {
  ssr: false,
  loading: () => null,
});
const Interests = dynamic(() => import('@/components/quick-portfolio/Interests'), {
  ssr: false,
  loading: () => null,
});
const Projects = dynamic(() => import('@/components/quick-portfolio/Projects'), {
  ssr: false,
  loading: () => null,
});
const Stack = dynamic(() => import('@/components/quick-portfolio/Stack'), {
  ssr: false,
  loading: () => null,
});
const Culture = dynamic(() => import('@/components/quick-portfolio/Culture'), {
  ssr: false,
  loading: () => null,
});
const Talks = dynamic(() => import('@/components/quick-portfolio/Talks'), {
  ssr: false,
  loading: () => null,
});

export default function QuickPortfolioBlocks() {
  return (
    <>
      {/* 배경과 페이지 패딩 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[35vw] h-[35vw] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,transparent_50%)] pointer-events-none" />
      </div>

      {/* 페이지 콘텐츠: 책 페이지처럼 전체 화면에 패딩 적용 */}
      <div className="h-full w-full px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-10 lg:py-12">
        {/* 중앙 절취선 (점선) */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-dashed border-border/70" />

        <BookPaginator
          className=""
          columnClassName=""
          hints={{
            columnBreakAfter: ['interests'],
            spreadBreakAfter: ['talks'],
          }}
          blocks={[
            <Profile key="profile" />,
            <RecentRoles key="recent-roles" />,
            <WhatIBring key="what-i-bring" />,
            <ImpactMetrics key="impact" />,
            <CollabStyle key="collab-style" />,
            <Interests key="interests" />,
            <Projects key="projects" />,
            <Stack key="stack" />,
            <Culture key="culture" />,
            <Talks key="talks" />,
          ]}
        />
      </div>

      {/* 고정형 CTA + Language */}
      <div className="fixed top-6 right-6 z-10 flex items-center gap-3">
        <LanguageDropdown />
        <LocaleLink
          to="/#about"
          className={cn(
            'px-4 py-2 rounded-lg border border-border/40 bg-background/80 backdrop-blur text-text-primary hover:bg-gray-50/50',
            'dark:hover:bg-gray-900/20 transition-colors font-pret shadow',
          )}
        >
          홈으로
        </LocaleLink>
      </div>
    </>
  );
}
