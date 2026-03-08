ALTER TABLE public.study_plans ADD COLUMN plan_type text NOT NULL DEFAULT 'manual';

-- Update existing rows that look like smart plan entries (assessments)
UPDATE public.study_plans SET plan_type = 'smart' WHERE chapter_id LIKE 'assessment-%' OR chapter_id LIKE 'rev-%';