import { register } from '$db/user'
import type { Locals } from '$types'
import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<Locals, FormData> = async ({ body }) => {
	const email = body.get('email')
	const password = body.get('password')
	const role = body.get('role')
	const name = body.get('name')
	const authType = body.get('auth-type') as 'register' | 'login'

	if (!role)
		return {
			status: 400,
			body: 'Please provide a user role',
		}

	try {
		if (authType === 'register') await register({ email, password, role, name })
	} catch (err) {
		return {
			status: 400,
			body: JSON.stringify(err),
		}
	}

	return {
		status: 303,
		headers: {
			location: '/dashboard',
		},
	}
}
