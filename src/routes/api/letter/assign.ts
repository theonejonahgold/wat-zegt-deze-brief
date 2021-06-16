import { client } from '$config/supabase'
import { fetchSingleLetter } from '$db/letter'
import type { definitions, Locals } from '$types'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<Locals, FormData> = async ({ body, headers }) => {
	const isVolunteer = await client.rpc('is_role', {
		user_id: client.auth.session().user.id,
		u_role: 'volunteer',
	})

	if (!isVolunteer) {
		if (headers.accept === 'application/json')
			return {
				status: 403,
				body: 'You cannot assign yourself to a letter as a user',
			}
		return {
			status: 302,
			headers: {
				location: '/dashboard',
			},
		}
	}

	const letterId = body.get('id')

	const { error } = await client
		.from<definitions['letters']>('letters')
		.update({ volunteer_id: client.auth.session().user.id })
		.eq('id', letterId)
		.single()

	if (error) {
		console.error(error)
		if (headers.accept === 'application/json')
			return {
				status: 500,
				body: error.message,
			}
		return {
			status: 303,
			headers: {
				location: '/dashboard',
			},
		}
	}

	const letter = await fetchSingleLetter(letterId)

	if (headers.accept === 'application/json')
		return {
			status: 200,
			body: letter,
		}

	return {
		status: 303,
		headers: {
			location: `/dashbaord/letter/${letterId}`,
		},
	}
}
