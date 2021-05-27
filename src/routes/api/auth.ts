import { login, register } from '$db/user'
import type { Locals } from '$types'
import type { Session } from '@supabase/gotrue-js'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<Locals, FormData> = async ({ body, headers }) => {
	const email = body.get('email')
	const password = body.get('password')
	const role = body.get('role')
	const name = body.get('name')
	const authType = body.get('auth-type') as 'register' | 'login'

	try {
		let session: Session
		if (authType === 'register') session = await register({ email, password, role, name })
		if (authType === 'login') session = (await login({ email, password })).session
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
