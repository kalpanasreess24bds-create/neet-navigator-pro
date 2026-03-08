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
}

export interface DayPlan {
  date: string; // ISO date string YYYY-MM-DD
  chapters: PlannedChapter[];
}

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
