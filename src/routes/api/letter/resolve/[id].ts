import { client } from '$config/supabase'
import type { definitions, Locals } from '$types'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<Locals, FormData> = async ({ headers, params, body }) => {
	const id = params.id
	const resolved = body.get('resolve') === 'true'
	const content = resolved
		? 'Dankjewel, ik heb genoeg uitleg gekregen'
		: 'Ik heb nog niet genoeg uitleg gekregen'

	const { body: message } = await client
		.from<definitions['messages']>('messages')
		.insert({
			sender_id: client.auth.session().user.id,
			content,
			type: 'text',
		})
		.single()

	await client.rpc('update_letter_messages', {
		letter_id: id,
		message_id: message.id,
	})

	if (!resolved) {
		return {
			status: 302,
			headers: {
				location: '/dashboard',
			},
		}
	}

	await client
		.from<definitions['letters']>('letters')
		.update({ status: 'resolved' })
		.eq('id', id)
		.single()

	if (headers.accept === 'application/json')
		return {
			status: 204,
		}

	return {
		status: 302,
		headers: {
			location: '/dashboard',
		},
	}
}
