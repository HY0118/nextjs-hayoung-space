'use client';

import { type PropsWithChildren, useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useProjectStore } from '@/store/projectStore';

const ProjectDetail = dynamic(() => import('@/components/projects/ProjectDetail'), {
  ssr: false,
});

type QuickPortfolioClientProps = PropsWithChildren<{
  sectionClassName?: string;
}>;

export default function QuickPortfolioClient({
  children,
  sectionClassName,
}: QuickPortfolioClientProps) {
  const { isDetailOpen, closeDetail } = useProjectStore();

  useEffect(() => {
    if (!isDetailOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDetail();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isDetailOpen, closeDetail]);

  return (
    <section
      className={sectionClassName}
      onClick={() => {
        const evt = new KeyboardEvent('keydown', { key: 'Escape' });
        window.dispatchEvent(evt);
      }}
    >
      {children}

      {isDetailOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40" />
          <ProjectDetail variant="modal" />
        </>
      )}
    </section>
  );
}
