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

export async function resolveLetter(id: string, val: string) {
	if (val === 'Ja') {
		return await client
			.from<definitions['letters']>('letters')
			.update({ status: 'resolved' })
			.eq('id', id)
			.single()
	} else {
	}
}
