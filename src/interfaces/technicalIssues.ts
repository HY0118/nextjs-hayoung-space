export interface TechnicalIssue {
  id: string;
  category: 'performance' | 'architecture' | 'optimization';
  projectName: string;
  title: string;
  summary: string;
  impact: string;
  impactValue: string;
  mainTechnologies: string[];
  duration: string;
}

export interface TechnicalIssueCardProps {
  issue: TechnicalIssue;
  index: number;
  onClick: () => void;
}

export interface CategoryConfig {
  label: string;
  color: string;
}

export interface TechnicalIssuesConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  categories: Record<string, CategoryConfig>;
}
