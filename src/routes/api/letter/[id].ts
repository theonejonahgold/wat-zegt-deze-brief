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
