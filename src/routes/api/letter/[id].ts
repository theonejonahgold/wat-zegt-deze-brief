import { client } from '$config/supabase'
import type { definitions, Locals } from '$types'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler<Locals> = async ({ params }) => {
	const res = await client.from<definitions['letters']>('letters').select().match({
		id: params.id,
		user_id: client.auth.session().user.id,
	})

	return {
		status: 200,
		body: res.body[0],
	}
}

export const post: RequestHandler<Locals, FormData> = async ({ params, body }) => {
	const id = params.id
	const sender = body.get('sender')

	const { data, error } = await client
		.from<definitions['letters']>('letters')
		.update({ sender, status: 'published' })
		.eq('id', id)

	if (data) {
		return {
			status: 302,
			headers: {
				location: '/dashboard/letter/success',
			},
		}
	}
}
