
-- Create study_plans table
CREATE TABLE public.study_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_date DATE NOT NULL,
  chapter_id TEXT NOT NULL,
  chapter_name TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  subject_color TEXT NOT NULL,
  subject_icon TEXT NOT NULL,
  time_slot TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  video_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, plan_date, chapter_id)
);

-- Enable RLS
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;

-- Users can only see their own plans
CREATE POLICY "Users can view own plans" ON public.study_plans
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plans" ON public.study_plans
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans" ON public.study_plans
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own plans" ON public.study_plans
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
