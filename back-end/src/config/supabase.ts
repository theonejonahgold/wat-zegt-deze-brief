import { createClient, SupabaseClient } from '@supabase/supabase-js'

export { getSupabaseClient }

const { SUPABASE_URL, SUPABASE_SECRET } = process.env

const client: SupabaseClient = createClient(SUPABASE_URL!, SUPABASE_SECRET!, {
	autoRefreshToken: true,
})

function getSupabaseClient() {
	return client
}
