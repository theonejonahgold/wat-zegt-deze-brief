import { client } from '$config/supabase'
import type { definitions, Locals } from '$types'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<Locals, FormData> = async ({ headers, params, query, body }) => {
	const id = params.id
	const content = body.get('message')

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

	return {
		status: 204,
	}
}
