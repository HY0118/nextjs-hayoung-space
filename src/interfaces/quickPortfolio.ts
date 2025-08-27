export interface EmploymentEntry {
  start: string;
  end: string;
  company: string;
  dept: string;
  position: string;
}

export type ToolName = string;
export type StackName = string;
export type WhatIBringItem = string;
export interface TalkItem {
  title: string;
  link?: string;
}

export interface CultureItem {
  title: string;
  description: string;
}
