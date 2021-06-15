import { client } from '$config/supabase'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ query }) => {
	const { error } = await client.from('onboardings').update({ letter_onboarding: true })
	if (error) throw error
	const skipped = query.get('skipped')

	return {
		status: 303,
		headers: {
			location: `/api/letter${skipped ? '?skipped=true' : ''}`,
		},
	}
}
