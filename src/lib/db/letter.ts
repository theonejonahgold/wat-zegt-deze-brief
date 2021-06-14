import { client } from '$config/supabase'
import type { definitions, Letter } from '$types'
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

export async function fetchSingleLetter(id: string) {
	const { data: letter } = await client
		.from<definitions['letters']>('letters')
		.select(
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
		.eq('id', id)
		.single()

	return letter
}
export async function dashboardLetters() {
	const { data: letters } = await client.from<definitions['letters']>('letters').select(
		`
			id,
			sender,
			createdAt,
			messages,
			page_order,
			status,
			user:user_id (
				id,
				name,
				languages
			),
			volunteer:volunteer_id (
				name,
				id
			)
		`
	)

	if (!letters || !letters.length) return []

	return await Promise.all<Letter>(
		letters.map(letter =>
			letter.messages
				? client
						.from<definitions['messages']>('messages')
						.select(
							`
							type,
							content,
							date,
							sender:sender_id (
								id,
								name
							)
						`
						)
						.in('id', letter.messages as unknown as string[])
						.then(
							({ data }) =>
								({
									...letter,
									messages: data,
								} as unknown as Letter)
						)
				: new Promise<Letter>(resolve => resolve(letter as unknown as Letter))
		)
	)
}
