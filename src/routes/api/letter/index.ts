import { v4 as uuid } from 'uuid'
import { client } from '$config/supabase'
import type { definitions, Locals } from '$types'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler<Locals> = async () => {
	if (!client.auth.session())
		return {
			status: 303,
			headers: {
				location: '/',
			},
		}

	const res = await client.from<definitions['letters']>('letters').insert({
		id: uuid(),
		user_id: client.auth.session().user.id,
		status: 'draft',
		resolved: false,
	})

	if (res.status !== 201)
		return {
			status: res.status,
			body: res.error,
		}

	return {
		status: 303,
		headers: {
			location: `/dashboard/letter/${res.body[0].id}`,
		},
	}
}
