import { notFound } from 'next/navigation';

import BackButton from '@/components/technical-issues/BackButton';
import TechnicalIssueDetail from '@/components/technical-issues/TechnicalIssueDetail';

import { TECHNICAL_ISSUES } from '@/constants/technical-issues';

interface Props {
  params: Promise<{
    id: string;
    locale?: string;
  }>;
}

export async function generateStaticParams() {
  return TECHNICAL_ISSUES.map((issue) => ({
    id: issue.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = TECHNICAL_ISSUES.find((p) => p.id === id);

  if (!issue) {
    return {
      title: 'Technical Issue Not Found',
    };
  }

  return {
    title: `${issue.title} | Technical Issue Solving`,
    description: issue.summary,
    openGraph: {
      title: issue.title,
      description: issue.summary,
      type: 'article',
    },
  };
}

export default async function TechnicalIssuePage({ params }: Props) {
  const { id, locale } = await params;
  const issue = TECHNICAL_ISSUES.find((p) => p.id === id);

  if (!issue) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[72px]">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="max-w-4xl mx-auto">
          <header className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-6 py-4 mb-4">
            {/* Title */}
            <h1 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
              기술 이슈 해결
            </h1>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Issues</span>
              <svg
                className="w-4 h-4"
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
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {issue.projectName}
              </span>
              <svg
                className="w-4 h-4"
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
              <span className="text-gray-900 dark:text-white font-semibold truncate max-w-xs">
                {issue.title}
              </span>
            </div>
          </header>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 pb-6">
        <div className="max-w-4xl mx-auto relative">
          {/* Sticky Back Button - Detail 영역 기준 왼쪽 */}
          <BackButton locale={locale} />

          {/* Content Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-5">
              <TechnicalIssueDetail issue={issue} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
