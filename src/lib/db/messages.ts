import { client } from '$config/supabase'
import type { definitions, ChatMessage, Letter } from '$types'

export async function listMessages(id: string): Promise<Array<ChatMessage>> {
	const {
		data: { messages: messageIDs },
	} = await client.from<definitions['letters']>('letters').select('messages').eq('id', id).single()
	if (!messageIDs?.length || (messageIDs?.length === 1 && messageIDs[0] === null)) return []

	const messages = await Promise.all<ChatMessage>(
		(
			await client
				.from<ChatMessage>('messages')
				.select(
					`
		id,
		type,
		content,
		date,
		sender:sender_id (
			id,
			name
		)
	`
				)
				.in('id', <string[]>(<unknown>messageIDs))
		).data
	)

	await client
		.from<definitions['message-status']>('message-status')
		.update({ read: true })
		.eq('user_id', client.auth.session().user.id)
		.eq('read', false)
		.in(
			'message_id',
			messages.map(({ id }) => id)
		)

	return await Promise.all(
		messages.map(message =>
			client
				.from('message-status')
				.select('read')
				.eq('message_id', message.id)
				.single()
				.then(({ data: { read } }) => ({
					...message,
					read: !!read,
				}))
		)
	)
}

export async function fetchMessage(id: string): Promise<ChatMessage> {
	const { data: message } = (await client
		.from<definitions['messages']>('messages')
		.select(
			`
		id,
		type,
		content,
		date,
		sender:sender_id (
			id,
			name
		)
	`
		)
		.eq('id', id)
		.single()) as unknown as { data: ChatMessage }

	try {
		await client
			.from('message-status')
			.update({ read: true })
			.eq('message_id', message.id)
			.eq('user_id', client.auth.session().user.id)
	} catch {}

	return message
}

export function downloadAudioMessage(letterId: string, userId: string, messageId: string) {
	return client.storage
		.from('messages')
		.download(`${letterId}/${userId}/${messageId}`)
		.then(({ data }) => data)
}
