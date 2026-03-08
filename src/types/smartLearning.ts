export interface VideoSegment {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  type: "introduction" | "concept" | "example" | "definition" | "important" | "exam_point" | "summary";
  summary: string;
  keyPoints: string[];
  tags: string[];
  transcript: string;
}

export interface MiniChapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  description: string;
}

export interface QuickRevision {
  title: string;
  points: string[];
}

export interface VideoAnalysis {
  segments: VideoSegment[];
  miniChapters: MiniChapter[];
  quickRevision: QuickRevision;
  totalDuration: number;
  breakPoints: number[];
  hasTranscript: boolean;
}
