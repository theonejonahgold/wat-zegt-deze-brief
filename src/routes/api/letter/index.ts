import { client } from '$config/supabase'
import type { definitions, Locals } from '$types'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler<Locals> = async ({ query }) => {
	if (!client.auth.session())
		return {
			status: 303,
			headers: {
				location: '/login',
			},
		}

	const res = await client.from<definitions['letters']>('letters').insert({
		user_id: client.auth.session().user.id,
	})

	if (res.status !== 201)
		return {
			status: res.status,
			body: res.error,
		}

	const skipped = query.get('skipped')

	return {
		status: 303,
		headers: {
			location: `/dashboard/letter/${res.body[0].id}/upload${skipped ? '?skipped=true' : ''}`,
		},
	}
}
