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
	const deadline = body.get('deadline')
	const route = body.get('route')
	const status = body.get('status')
	const editing = !!query.get('editing')
	const redirect = query.get('redirect')

	let updateBody: Record<string, string> = {}
	if (route === 'senderRoute') updateBody.sender = sender ? sender : null
	if (route === 'deadlineRoute')
		updateBody.deadline = deadline ? new Date(deadline).toISOString() : null
	if (status) updateBody.status = status

	console.log(updateBody.deadline)

	const { data, error } = await client
		.from<definitions['letters']>('letters')
		.update(updateBody)
		.eq('id', id)

	if (data) {
		return {
			status: 302,
			headers: {
				location:
					redirect ||
					(editing
						? `/dashboard/letter/${id}`
						: sender
						? `/dashboard/letter/${id}/deadline`
						: `/dashboard/letter/${id}`),
			},
		}
	}
}
