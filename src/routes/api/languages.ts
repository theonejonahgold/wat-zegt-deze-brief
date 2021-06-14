import type { RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie'

export const post: RequestHandler<{}, FormData> = ({ body, query, headers }) => {
	const code = body.get('code')
	const searchQuery = query.get('query')
	const cookies = cookie.parse(headers.cookie || '')
	const languages = new Set<string>(!!cookies.langs ? cookies.langs.split(',') : [])

	if (languages.has(code)) languages.delete(code)
	else if (languages.size < 3) languages.add(code)

	console.log(languages.has(code))

	const langCookie = cookie.serialize('langs', [...languages].join(','), {
		maxAge: 60 * 60,
		sameSite: 'strict',
		path: '/', 
	})
	if (headers.accept === 'application/json')
		return {
			status: 200,
			body: code,
			headers: {
				'Set-Cookie': langCookie,
			},
		}

	return {
		status: 303,
		headers: {
			location: `/onboarding/user/languages?query=${searchQuery}`,
			'Set-Cookie': langCookie,
		},
	}
}
