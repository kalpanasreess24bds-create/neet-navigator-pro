
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert notifications"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Allow edge functions (service role) to insert
CREATE POLICY "Service role insert"
ON public.notifications
FOR INSERT
TO service_role
WITH CHECK (true);
