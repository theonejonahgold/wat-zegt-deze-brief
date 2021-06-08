import { client } from '$config/supabase'
import { browser } from '$app/env'
import type { definitions } from '$types'

export async function volunteerLetter() {
	if (!browser) return

	const splitPathname = window.location.pathname.split('/')
	const letterId = splitPathname[splitPathname.length - 1]
	const userId = client.auth.session().user.id
	await client
		.from<definitions['letters']>('letters')
		.update({ volunteer_id: userId })
		.eq('id', letterId)
}
