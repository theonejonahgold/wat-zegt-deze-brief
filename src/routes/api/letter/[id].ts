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

export const post: RequestHandler<Locals, FormData> = async ({ params, query, body }) => {
	const id = params.id
	const sender = body.get('sender')
	const status = body.get('status')
	const deadline = body.get('deadline')

	let updateBody: Record<string, string> = {}
	if (sender) updateBody.sender = sender
	if (status) updateBody.status = status
	if (deadline) updateBody.deadline = deadline

	const { data } = await client
		.from<definitions['letters']>('letters')
		.update(updateBody)
		.eq('id', id)

	if (data) {
		return {
			status: 302,
			headers: {
				location:
					query.get('redirect') || sender
						? `/dashboard/letter/${id}/deadline`
						: `/dashboard/letter/${id}`,
			},
		}
	}
}
