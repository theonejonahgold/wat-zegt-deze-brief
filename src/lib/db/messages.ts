import { client } from '$config/supabase'
import type { definitions } from '$types'

export function listMessages(id: string) {
	const messages = client
		.from<definitions['letters']>('letters')
		.select('messages')
		.eq('id', id)
		.single()

	return messages
}

export function downloadMessage(letterId: string, userId: string, messageId: string) {
	return client.storage.from('messages').download(`${letterId}/${userId}/${messageId}`)
}
