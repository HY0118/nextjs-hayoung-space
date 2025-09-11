'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useLandingStore } from '@/store/landingStore';

export default function LandingSelector() {
  const { isOpen, initialize, choose, close } = useLandingStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-background rounded-2xl shadow-2xl border border-border/40 overflow-hidden">
        <div className="px-8 py-6 border-b border-border/30">
          <h3 className="text-2xl font-bold text-text-primary font-sora">
            무엇을 보고 싶으세요?
          </h3>
          <p className="text-text-secondary mt-2">
            원하는 목적을 선택하면 그에 맞게 안내해 드릴게요.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 p-8">
          <button
            onClick={() => close()}
            className="group rounded-xl border border-border/30 p-6 text-left transition-colors bg-gray-50/30 dark:bg-gray-900/20 flex flex-col items-start hover:border-primary hover:bg-primary/5"
          >
            <div className="text-xl font-semibold text-text-primary mb-2">
              홈페이지 둘러보기
            </div>
            <p className="text-text-secondary mb-3">
              홈, 기술, 프로젝트를 자유롭게 탐색합니다.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                🎨 FE 사이트 구경하기
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                🔍 호기심 탐방
              </span>
            </div>
            <div className="mt-auto ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity pt-4">
              자유롭게 둘러보기 →
            </div>
          </button>
          <button
            onClick={() => {
              choose('portfolio');
              router.push('/quick-portfolio');
            }}
            className="group rounded-xl border border-border/30 p-6 text-left transition-colors bg-gray-50/30 dark:bg-gray-900/20 flex flex-col items-start hover:border-primary hover:bg-primary/5"
          >
            <div className="text-xl font-semibold text-text-primary mb-2">
              이력/주요 프로젝트 빠르게 보기
            </div>
            <p className="text-text-secondary mb-3">
              간단 이력과 대표 작업 위주로 살펴봅니다.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                👔 면접관 추천
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                ⚡ 빠른 검토 & 시간 절약
              </span>
            </div>
            <div className="mt-auto ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity pt-4">
              핵심만 빠르게 보기 →
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
