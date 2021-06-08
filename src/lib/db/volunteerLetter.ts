import { client } from '$config/supabase'
import { browser } from '$app/env'
import type { definitions } from '$types'

export async function volunteerLetter(letterId: string) {
	if (!browser) return

	const userId = client.auth.session().user.id
	await client
		.from<definitions['letters']>('letters')
		.update({ volunteer_id: userId })
		.eq('id', letterId)
}
