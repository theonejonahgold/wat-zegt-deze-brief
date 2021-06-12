import { client } from '$config/supabase'
import type { definitions, ChatMessage } from '$types'

export async function listMessages(id: string): Promise<Array<definitions['messages']>> {
	const {
		data: { messages: messageIDs },
	} = await client.from<definitions['letters']>('letters').select('messages').eq('id', id).single()
	if (!messageIDs.length || (messageIDs.length === 1 && messageIDs[0] === null)) return []

	const { data: messages } = await client
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
		.in('id', <string[]>(<unknown>messageIDs))

	return messages
}

export async function fetchMessage(id: string): Promise<ChatMessage> {
	console.log(id)
	const { data: message } = await client
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
		.single()

	console.log(message)

	return message as any
}

export function downloadAudioMessage(letterId: string, userId: string, messageId: string) {
	return client.storage
		.from('messages')
		.download(`${letterId}/${userId}/${messageId}`)
		.then(
			({ data }) =>
				new Promise<string>((resolve, reject) => {
					const reader = new FileReader()
					reader.readAsDataURL(data)
					reader.addEventListener('loadend', e => resolve(e.target.result as string))
					reader.addEventListener('error', reject)
				})
		)
}
