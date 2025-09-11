'use client';

import { motion } from 'framer-motion';

import { TECHNICAL_ISSUES_CONFIG } from '@/constants/technicalIssues';
import { getDetailContent } from '@/constants/technicalIssuesDetail';
import type {
  Result,
  Solution,
  TechnicalConsideration,
} from '@/constants/technicalIssuesDetail';

import type { TechnicalIssue } from '@/interfaces/technicalIssues';

interface Props {
  issue: TechnicalIssue;
}

const TechnicalIssueDetail = ({ issue }: Props) => {
  const categoryConfig = TECHNICAL_ISSUES_CONFIG.categories[issue.category];
  const detailContent = getDetailContent(issue.id);

  if (!detailContent) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          상세 내용 준비 중
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          이 기술 이슈의 상세 내용은 곧 업데이트될 예정입니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Header Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {categoryConfig.label}
          </span>
          <span className="px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {issue.duration}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
          {issue.title}
        </h1>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-lg">
          {issue.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
              프로젝트
            </div>
            <div className="font-bold text-slate-900 dark:text-white text-lg">
              {issue.projectName}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
              주요 성과
            </div>
            <div className="font-bold text-slate-900 dark:text-white text-lg">
              {issue.impact}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Problem Description Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
          <div className="w-1 h-6 bg-blue-500 rounded-full mr-4"></div>
          복잡한 기술적 문제 상황
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {detailContent.problemDescription}
        </p>
      </motion.div>

      {/* Technical Considerations Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
          <div className="w-1 h-6 bg-blue-500 rounded-full mr-4"></div>
          심층적 기술 고민 과정
        </h2>
        <div className="space-y-6">
          {detailContent.technicalConsiderations.map(
            (consideration: TechnicalConsideration, index: number) => (
              <div key={index}>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {index + 1}. {consideration.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {consideration.description}
                </p>
              </div>
            ),
          )}
        </div>
      </motion.div>

      {/* Solutions Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
          <div className="w-1 h-6 bg-blue-500 rounded-full mr-4"></div>
          아키텍처 기반 해결책
        </h2>
        <div className="space-y-8">
          {detailContent.solutions.map((solution: Solution, index: number) => (
            <div key={index}>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
                {index + 1}. {solution.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {solution.description}
              </p>
              <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4">
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  구현 방법:
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  {solution.implementation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Results Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
          <div className="w-1 h-6 bg-blue-500 rounded-full mr-4"></div>
          정량적 성과 및 임팩트
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {detailContent.results.map((result: Result, index: number) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {result.metric}
                </h3>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {result.value}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {result.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Technology Stack Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
          <div className="w-1 h-6 bg-blue-500 rounded-full mr-4"></div>
          사용된 기술 스택
        </h2>
        <div className="flex flex-wrap gap-3">
          {issue.mainTechnologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalIssueDetail;
