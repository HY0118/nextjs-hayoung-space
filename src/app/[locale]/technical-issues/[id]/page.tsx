import TechnicalIssuePage from '@/app/technical-issues/[id]/page';

import { TECHNICAL_ISSUES } from '@/constants/technicalIssues';

interface Props {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'ko'];
  const issues = TECHNICAL_ISSUES;

  return locales.flatMap((locale) =>
    issues.map((issue) => ({
      locale,
      id: issue.id,
    })),
  );
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

export default async function LocaleTechnicalIssuePage({ params }: Props) {
  const { id, locale } = await params;
  return <TechnicalIssuePage params={Promise.resolve({ id, locale })} />;
}
