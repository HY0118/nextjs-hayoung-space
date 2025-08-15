"use client";

import Image from "next/image";

export default function Profile() {
  const employment = [
    { start: "2022.04", end: "현재", company: "마이다스아이티", dept: "RPM개발팀", position: "프로" },
    { start: "2019.10", end: "2022.04", company: "인피니트헬스케어", dept: "연구개발1본부", position: "연구원" },
    { start: "2019.07", end: "2019.09", company: "인피니트헬스케어", dept: "연구개발1본부", position: "인턴" },
  ];

  const formatDate = (date: string) => (date === "현재" ? date : date.replace(/^20/, ""));

  return (
    <div>
      <div className="flex items-start gap-8">
        <div className="relative w-32 h-40 md:w-40 md:h-52 rounded-xl overflow-hidden">
          <Image src="/images/hayoung.jpg" alt="Profile" fill className="object-cover" sizes="160px" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary font-sora">이하영 · 프론트엔드 개발자</h2>
          <p className="text-text-secondary mt-2 font-pret">사용자 경험 중심 · React, Next.js, TypeScript</p>
          <div className="mt-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-text-secondary/80">EMPLOYMENT</h3>
            <ul className="mt-2 grid grid-cols-[100px_minmax(150px,1fr)_minmax(160px,1fr)_auto] md:grid-cols-[120px_minmax(190px,1fr)_minmax(190px,1fr)_auto] gap-x-3 md:gap-x-4 gap-y-2 text-sm md:text-base font-pret">
              {employment.map((item) => (
                <li key={`${item.company}-${item.start}`} className="contents whitespace-nowrap">
                  <div className="grid grid-cols-[1fr_12px_1fr] md:grid-cols-[1fr_14px_1fr] items-center tabular-nums text-text-primary font-medium">
                    <span className="text-right">{formatDate(item.start)}</span>
                    <span className="text-text-secondary text-center" aria-hidden>
                      –
                    </span>
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
  );
}


