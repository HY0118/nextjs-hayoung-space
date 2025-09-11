'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import SectionTitle from '@/components/shared/SectionTitle';

import { TECHNICAL_ISSUES, TECHNICAL_ISSUES_CONFIG } from '@/constants/technicalIssues';

import type {
  TechnicalIssue,
  TechnicalIssueCardProps,
} from '@/interfaces/technicalIssues';

const TechnicalIssueCard = ({ issue, index, onClick }: TechnicalIssueCardProps) => {
  const categoryConfig = TECHNICAL_ISSUES_CONFIG.categories[issue.category];

  return (
    <motion.div
      className="group relative bg-white dark:bg-slate-800 rounded-3xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 cursor-pointer border border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 backdrop-blur-sm"
      whileHover={{ y: -12 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* 순서 번호 */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* 카테고리 배지 */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${categoryConfig.color}`}
        >
          {categoryConfig.label}
        </span>
      </div>

      {/* 프로젝트명 */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
        {issue.projectName}
      </div>

      {/* 제목 */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {issue.title}
      </h3>

      {/* 요약 */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
        {issue.summary}
      </p>

      {/* 성과 지표 */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl p-4 mb-4 border border-blue-100 dark:border-blue-800/30">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {issue.impactValue}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            {issue.impact}
          </div>
        </div>
      </div>

      {/* 기술 스택 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {issue.mainTechnologies.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-lg font-medium border border-blue-200 dark:border-blue-800/30"
          >
            {tech}
          </span>
        ))}
        {issue.mainTechnologies.length > 3 && (
          <span className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs rounded-lg font-medium border border-slate-200 dark:border-slate-600">
            +{issue.mainTechnologies.length - 3}
          </span>
        )}
      </div>

      {/* 자세히 보기 버튼 */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {issue.duration}
        </div>
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:translate-x-2 transition-all duration-300">
          자세히 보기
          <svg
            className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const TechnicalIssues = () => {
  const [_hoveredIndex, _setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleCardClick = (issue: TechnicalIssue) => {
    router.push(`/technical-issues/${issue.id}`);
  };

  return (
    <section
      id="issues"
      className="py-16 bg-background"
    >
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>{TECHNICAL_ISSUES_CONFIG.sectionTitle}</SectionTitle>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {TECHNICAL_ISSUES_CONFIG.sectionSubtitle}
          </p>
        </motion.div>

        {/* 문제 해결 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TECHNICAL_ISSUES.map((issue, index) => (
            <TechnicalIssueCard
              key={issue.id}
              issue={issue}
              index={index}
              onClick={() => handleCardClick(issue)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalIssues;
