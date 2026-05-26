/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type TechTool = 'SQL' | 'Excel' | 'Power BI' | 'Tableau' | 'Python' | 'Agile/Scrum' | 'BA Core' | 'Data Viz';

export interface PracticeTask {
  id: string;
  title: string;
  desc: string;
  expectedResult?: string;
}

export interface Subtopic {
  id: string;
  title: string;
  desc: string;
  tool: TechTool;
  difficulty: Difficulty;
  estimatedTime: string;
  concepts: string[];
  tasks: PracticeTask[];
  resources: { name: string; url?: string; desc?: string }[];
}

export interface Week {
  weekNum: number;
  title: string;
  focus: string;
  subtopics: Subtopic[];
}

export interface Phase {
  id: string;
  title: string;
  weeksRange: string;
  description: string;
  weeks: Week[];
}

export interface SQLChallenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  schemaDesc: string;
  tableData: Record<string, string | number>[];
  targetSchema: string[]; // column names
  correctQueryPattern: RegExp; // simplified regex match
  sampleCorrectQuery: string;
  hints: string[];
  testCases: {
    query: string;
    shouldPass: boolean;
    expectedOutputRowsCount: number;
  }[];
}

export interface InterviewQuestion {
  id: number;
  category: 'Role & Process Fundamentals' | 'Tools, Techniques & Modeling' | 'Technical & Data Skills' | 'Behavioral & Stakeholder Management' | 'Scenario, Leadership & Strategy';
  question: string;
  answer: string;
  isStarred?: boolean;
}

export interface Project {
  id: string;
  title: string;
  difficulty: Difficulty;
  tools: TechTool[];
  description: string;
  deliverables: string[];
  steps: string[];
  mockDataSnippet?: string;
  suggestedDatasetUrl?: string;
}

export interface CertificationCourse {
  id: string;
  provider: string;
  title: string;
  duration: string;
  isFreeCert: boolean;
  url: string;
  benefits: string[];
}

export interface UserProgress {
  completedSubtopics: string[]; // list of completed subtopic IDs
  bookmarkedSubtopics: string[]; // list of bookmarked subtopic IDs
  revisionSubtopics: string[]; // list of subtopics in revision tracker
  notes: Record<string, string>; // subtopicId -> markdown note text
  completedProjects: string[]; // list of project IDs
  completedCertifications: string[]; // list of cert IDs
  starredInterviewQuestions: number[]; // list of question IDs
  streakCount: number;
  lastActiveDate?: string;
  dailyGoalProgress: {
    date: string;
    subtopicsGoal: number; // typically 2
    subtopicsCompleted: number;
    sqlGoal: number; // typically 1
    sqlCompleted: number;
  };
  sqlSolvedChallenges: string[]; // list of solved SQL challenge IDs
  subtopicStatuses?: Record<string, 'pending' | 'active' | 'completed'>; // map of subtopicId -> status
  completedDataAnalystResources?: string[]; // list of completed data analyst resource IDs
}
