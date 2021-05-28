import type { Session } from '@supabase/gotrue-js'

export interface Locals {
	session: Session
	cookies: Record<string, string>
}
