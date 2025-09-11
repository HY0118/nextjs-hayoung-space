'use client';

import { motion } from 'framer-motion';

import { TECHNICAL_ISSUES, TECHNICAL_ISSUES_CONFIG } from '@/constants/technicalIssues';

import type { Project } from '@/interfaces/project';

interface TechnicalIssuesProps {
  project: Project;
  onIssueClick: (issueId: string) => void;
}

const TechnicalIssues = ({ project, onIssueClick }: TechnicalIssuesProps) => {
  // 현재 프로젝트와 관련된 기술 이슈들 찾기
  const relatedIssues = TECHNICAL_ISSUES.filter(
    (issue) => issue.projectId === project.id,
  );

  // 관련된 이슈가 없으면 렌더링하지 않음
  if (relatedIssues.length === 0) return null;

  // 동적 그리드 컬럼 결정
  const getGridCols = (count: number) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 lg:grid-cols-2';
    return 'grid-cols-1 lg:grid-cols-3';
  };

  const handleIssueClick = (issueId: string) => {
    onIssueClick(issueId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <h4 className="text-base font-semibold text-text-primary mb-3 font-sora">
        Technical Issues Resolved
      </h4>

      {/* 기술 이슈 카드들 */}
      <div className={`grid ${getGridCols(relatedIssues.length)} gap-3`}>
        {relatedIssues.map((issue) => {
          const categoryConfig =
            TECHNICAL_ISSUES_CONFIG.categories[
              issue.category as keyof typeof TECHNICAL_ISSUES_CONFIG.categories
            ];

          return (
            <div
              key={issue.id}
              className="group bg-gray-50/40 dark:bg-gray-800/20 p-3 rounded-md border border-gray-200/20 dark:border-gray-700/20 hover:border-primary/30 transition-colors duration-200 cursor-pointer"
              onClick={() => handleIssueClick(issue.id)}
            >
              {/* 카테고리와 기간 */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-primary font-medium">
                  {categoryConfig.label}
                </span>
                <span className="text-xs text-text-secondary">{issue.duration}</span>
              </div>

              {/* 제목 */}
              <h5 className="font-medium text-primary mb-1.5 text-sm">{issue.title}</h5>

              {/* 성과 지표 */}
              <div className="flex items-center gap-1 mb-2">
                <span className="text-lg font-bold text-primary">
                  {issue.impactValue}
                </span>
                <span className="text-xs text-text-secondary">improvement</span>
              </div>

              {/* 요약 */}
              <p className="text-xs text-text-secondary leading-relaxed mb-2">
                {issue.summary.length > 80
                  ? `${issue.summary.substring(0, 80)}...`
                  : issue.summary}
              </p>

              {/* 기술 스택 */}
              <div className="flex flex-wrap gap-1 mb-2">
                {issue.mainTechnologies.slice(0, 2).map((tech: string) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {issue.mainTechnologies.length > 2 && (
                  <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                    +{issue.mainTechnologies.length - 2}
                  </span>
                )}
              </div>

              {/* 자세히 보기 링크 */}
              <div className="flex items-center text-primary text-xs font-medium group-hover:translate-x-1 transition-transform">
                View Details
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TechnicalIssues;
