import { login, register } from '$db/user'
import type { Locals } from '$types'
import type { Session } from '@supabase/gotrue-js'
import type { RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie'

export const post: RequestHandler<Locals, FormData> = async ({ body, headers }) => {
	const email = body.get('email')
	const password = body.get('password')
	const role = body.get('role')
	const name = body.get('name')
	const cookies = cookie.parse(headers.cookie || '')
	const languages = [...new Set<string>(!!cookies.langs ? cookies.langs.split(',') : [])]
	const authType = body.get('auth-type') as 'register' | 'login'

	try {
		let session: Session
		switch (authType) {
			case 'register':
				session = await register({ email, password, role, name, languages })
				break
			case 'login':
				session = await login({ email, password })
				break
			default:
				return {
					status: 400,
					body: 'Auth type not supported (yet).',
				}
		}
		if (headers.accept === 'application/json')
			return {
				status: 200,
				body: {
					session,
				},
			}

		return {
			status: 303,
			headers: {
				location: '/dashboard',
			},
		}
	} catch (err) {
		return {
			status: 400,
			body: JSON.stringify(err),
		}
	}
}
