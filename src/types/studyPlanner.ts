export interface PlannedChapter {
  id: string;
  chapterId: string;
  chapterName: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  subjectIcon: string;
  timeSlot?: string;
  completed: boolean;
  videoId?: string;
  /** Assessment type — if set, this entry is a test, not a study chapter */
  assessmentType?: "weekly" | "monthly";
}

export interface DayPlan {
  date: string; // ISO date string YYYY-MM-DD
  chapters: PlannedChapter[];
}

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

/** Check if a planned entry is an assessment */
export function isAssessment(ch: PlannedChapter): boolean {
  return ch.chapterId.startsWith("assessment-");
}
