DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscriptions;

CREATE POLICY "Users can submit payment reference"
ON public.subscriptions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (
  auth.uid() = user_id
  AND status = 'pending'
  AND activated_at IS NULL
);