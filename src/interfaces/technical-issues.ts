export interface TechnicalIssue {
  id: string;
  projectId: string;
  projectName: string;
  category: 'Performance' | 'Architecture' | 'Security' | 'UX' | 'System Design';
  title: string;
  summary: string;
  impact: string;
  impactValue: string; // "65%", "80%", "90%" 등
  mainTechnologies: string[];
  detailPath: string;
  duration: string; // "2 weeks", "1 month" 등
}

export interface TechnicalIssuesProps {
  issues: TechnicalIssue[];
}

export interface TechnicalIssueCardProps {
  issue: TechnicalIssue;
  index: number;
  onClick: () => void;
}
