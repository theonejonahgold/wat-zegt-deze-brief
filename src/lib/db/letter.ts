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
			user:user_id (
				name,
				id
			),
			status,
			page_order,
			thumbnail,
			page_order,
			deadline,
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

interface DashboardLettersProps {
	status?: string[] | 'all'
	assigned?: boolean
}

export async function dashboardLetters({ status = 'all', assigned }: DashboardLettersProps = {}) {
	const promise = client
		.from<definitions['letters']>('letters')
		.select(
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
		.in('status', status === 'all' ? ['resolved', 'published', 'draft'] : status)

	if (assigned) promise.eq('volunteer_id', client.auth.session().user.id)
	else if (typeof assigned === 'boolean') promise.is('volunteer_id', null)

	const { data: letters } = await promise

	if (!letters || !letters.length) return []

	return await Promise.all<Letter>(
		letters.map(letter =>
			letter.messages
				? client
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
						.in('id', letter.messages as unknown as string[])
						.then(({ data }) =>
							Promise.all(
								data.map(message =>
									client
										.from<definitions['message-status']>('message-status')
										.select('read')
										.eq('message_id', message.id)
										.single()
										.then(({ data }) => ({ ...message, read: data?.read }))
								)
							).then(
								messages =>
									({
										...letter,
										messages,
									} as unknown as Letter)
							)
						)
				: new Promise<Letter>(resolve => resolve(letter as unknown as Letter))
		)
	)
}
