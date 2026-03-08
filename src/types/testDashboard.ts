export type TestCategory = "mock" | "worksheet" | "weekly" | "monthly";

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  chapter: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface TestResult {
  questionId: string;
  selected: number | null;
  correct: boolean;
  timeTaken: number; // seconds spent on this question
}

export interface TestConfig {
  category: TestCategory;
  title: string;
  totalQuestions: number;
  timeMinutes: number;
  questions: TestQuestion[];
  subjectBreakdown?: Record<string, number>;
}

export interface TestReport {
  score: number;
  maxScore: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  accuracy: number;
  totalTime: number;
  subjectWise: Record<string, {
    correct: number;
    incorrect: number;
    unanswered: number;
    total: number;
    score: number;
    timeTaken: number;
    weakTopics: string[];
  }>;
}

export interface SubjectConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const TEST_SUBJECTS: SubjectConfig[] = [
  { id: "botany", name: "Botany", icon: "🌿", color: "hsl(152 60% 45%)" },
  { id: "zoology", name: "Zoology", icon: "🦠", color: "hsl(340 65% 50%)" },
  { id: "physics", name: "Physics", icon: "⚛️", color: "hsl(38 92% 55%)" },
  { id: "chemistry", name: "Chemistry", icon: "⚗️", color: "hsl(243 75% 55%)" },
];
