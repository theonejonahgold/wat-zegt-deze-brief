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
			messages,
			user_id,
			status,
			thumbnail,
			volunteer:volunteer_id (
				name,
				id
			)
		`
	)
}
