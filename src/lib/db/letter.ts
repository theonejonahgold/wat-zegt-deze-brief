import { client } from '$config/supabase'
import type { definitions } from '$types'
import { v4 as uuid } from 'uuid'

interface CreateLetterProps {
	userId: string
}

export function createLetter({ userId }: CreateLetterProps) {
	return client.from<definitions['letters']>('letters').insert({
		id: uuid(),
		user_id: userId,
	})
}

export function listLetters() {
	return client.from<definitions['letters']>('letters').select(
		`
			id,
			sender,
			createdAt,
			volunteer:volunteer_id,
			status,
			thumbnail
		`
	)
}

export function listMessages(id: string) {
	const messages = client
		.from<definitions['letters']>('letters')
		.select('messages')
		.eq('id', id)
		.single()

	return messages
}
