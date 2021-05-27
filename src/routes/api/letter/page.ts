import { v4 as uuid } from 'uuid'
import { client } from '$config/supabase'
import type { Locals } from '$types'
import type { RequestHandler } from '@sveltejs/kit'
import FormData from 'form-data'
import fetch from 'node-fetch'

export const post: RequestHandler<
	Locals,
	{
		'letter-id': string
		files: {
			page: {
				filename: string
				mimetype: string
				encoding: string
				file: Buffer
			}
		}
	}
> = async ({ body }) => {
	console.log(body)

	const filePath = `${uuid()}.${body.files.page.mimetype.split('/')[1]}`

	// Thanks from joshnuss and his commet at https://github.com/supabase/supabase/discussions/1002#discussioncomment-560098 for this piece of code
	// @ts-expect-error: Isn't typed, but does work
	const path = `${client.storage.url}/object/pages/${body['letter-id']}/${filePath}`
	// @ts-expect-error: Isn't typed, but does work
	const headers = client.storage.headers

	const formData = new FormData()

	formData.append('', body.files.page.file, filePath)
	formData.append('cacheControl', 3600)

	const res = await fetch(path, {
		method: 'POST',
		headers,
		body: formData,
	})

	console.log(res)
	const data = await res.json()

	console.log(data)

	return {
		status: 200,
		body: data.data?.Key,
	}
}
