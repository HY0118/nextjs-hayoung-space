"use client";

import { useEffect } from "react";
import { useLandingStore } from "@/store/landingStore";
import { useRouter } from "next/navigation";

export default function LandingSelector() {
  const { isOpen, initialize, choose, close } = useLandingStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-background rounded-2xl shadow-2xl border border-border/40 overflow-hidden">
        <div className="px-8 py-6 border-b border-border/30">
          <h3 className="text-2xl font-bold text-text-primary font-sora">무엇을 보고 싶으세요?</h3>
          <p className="text-text-secondary mt-2">원하는 목적을 선택하면 그에 맞게 안내해 드릴게요.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 p-8">
          <button
            onClick={() => close()}
            className="group rounded-xl border border-border/30 p-6 text-left hover:border-primary/50 transition-colors bg-gray-50/30 dark:bg-gray-900/20 flex flex-col items-start"
          >
            <div className="text-xl font-semibold text-text-primary mb-2">홈페이지 둘러보기</div>
            <p className="text-text-secondary">홈, 기술, 프로젝트를 자유롭게 탐색합니다.</p>
            <div className="mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">바로 시작하기 →</div>
          </button>
          <button
            onClick={() => {
              choose("portfolio");
              router.push("/quick-portfolio");
            }}
            className="group rounded-xl border border-border/30 p-6 text-left hover:border-primary/50 transition-colors bg-gray-50/30 dark:bg-gray-900/20 flex flex-col items-start"
          >
            <div className="text-xl font-semibold text-text-primary mb-2">이력/주요 프로젝트 빠르게 보기</div>
            <p className="text-text-secondary">포트폴리오 하이라이트와 대표 작업 위주로 살펴봅니다.</p>
            <div className="mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">추천 흐름으로 보기 →</div>
          </button>
        </div>
      </div>
    </div>
  );
}
