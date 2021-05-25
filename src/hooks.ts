import { client } from '$config/supabase'
import type { Locals } from '$types'
import type { GetSession, Handle } from '@sveltejs/kit'
import cookie from 'cookie'
import type { AppSession } from '$types'

export const handle: Handle<Locals> = async ({ render, request }) => {
	const cookies = cookie.parse(request.headers.cookie || '')
	const response = await render(request)
	const session = client.auth.session()

	if (!cookies['sb:token'] && session)
		response.headers['Set-Cookie'] = cookie.serialize('sb:token', session.access_token, {
			maxAge: 60 * 60 * 8,
			path: '/',
			sameSite: 'lax',
		})
	else if (cookies['sb:token'] && !session)
		response.headers['Set-Cookie'] = cookie.serialize('sb:token', '', {
			maxAge: 0,
			path: '/',
			sameSite: 'lax',
		})
	return response
}

export const getSession: GetSession<Locals, AppSession> = async request => ({
	session: request.locals.session,
})
