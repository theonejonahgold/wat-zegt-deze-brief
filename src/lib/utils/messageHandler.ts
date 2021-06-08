import { v4 as uuid } from 'uuid'
import { client } from '$config/supabase'

export async function messageHandler(e: any) {
	const message: File = e.detail
	if (!message) return

	const id = uuid()
	await client.storage.from('messages').upload(`${id}`, message)
}
