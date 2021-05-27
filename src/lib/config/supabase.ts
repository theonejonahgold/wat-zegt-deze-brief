import { SUPABASE_KEY, SUPABASE_URL } from '$config/env'
import { createClient } from '@supabase/supabase-js'

export const client = createClient(SUPABASE_URL, SUPABASE_KEY, {
	persistSession: true,
	autoRefreshToken: true,
})
