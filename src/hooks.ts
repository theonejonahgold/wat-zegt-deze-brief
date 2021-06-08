import { client } from '$config/supabase'
import type { Locals } from '$types'
import type { GetSession, Handle } from '@sveltejs/kit'
import cookie from 'cookie'
import busboy from 'busboy'
import type { ServerRequest } from '@sveltejs/kit/types/endpoint'

export const handle: Handle = async ({ request, render }) => {
	// Gigantic thank you from vonadz and his comment at https://github.com/sveltejs/kit/issues/70#issuecomment-830799681
	if (request.path === '/api/letter/page') {
		if (!client.auth.session())
			return {
				status: 403,
				body: 'Not allowed',
				headers: {},
			}
		request = await parseFileBody(request)
	}

	const cookies = cookie.parse(request.headers.cookie || '')
	request.locals.cookies = cookies
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
	else if (cookies['sb:token'] !== session?.access_token) {
		response.headers['Set-Cookie'] = cookie.serialize('sb:token', session.access_token, {
			maxAge: 60 * 60 * 8,
			path: '/',
			sameSite: 'lax',
		})
	}
	return response
}

export const getSession: GetSession<Locals> = async request => ({
	session: request.locals.session,
	cookies: request.locals.cookies,
})

const parseFileBody = async (request: ServerRequest) => {
	const files = {}
	await new Promise((resolve, reject) => {
		const bb = new busboy({
			headers: { 'content-type': request.headers['content-type'] },
		})
		bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
			const buffers = []
			files[fieldname] = {
				filename,
				encoding,
				mimetype,
			}
			file
				.on('data', fileData => {
					buffers.push(fileData) //this adds files as buffers, which can be hard on memory. You can also write to a file using streams here.
				})
				.on('end', () => {
					const buffer = Buffer.concat(buffers)
					files[fieldname]['file'] = buffer
				})
		})
			.on('field', (fieldname, val) => {
				request.body[fieldname] = val
			})
			.on('finish', () => {
				request.body['files'] = files
				resolve(request.body)
			})
			.on('error', err => {
				reject(err)
			})

		bb.end(request.rawBody)
	})
	return request
}
