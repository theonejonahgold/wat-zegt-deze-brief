import { client } from '$config/supabase'
import { browser } from '$app/env'
import type { definitions } from '$types'
import { v4 as uuid } from 'uuid'

export async function messageHandler({ detail: message }: CustomEvent<File>) {
	if (!message || !browser) return

	const splitPathname = window.location.pathname.split('/')
	const id = splitPathname[splitPathname.length - 1]
	const userId = client.auth.session().user.id
	const messageId = uuid()
	await client.storage.from('messages').upload(`${id}/${userId}/${messageId}`, message)
	const { body } = await client
		.from<definitions['messages']>('messages')
		.insert({
			sender_id: userId,
			content: messageId,
			type: 'audio',
		})
		.single()
	await client.rpc('update_letter_messages', {
		letter_id: id,
		message_id: body.id,
	})
}
