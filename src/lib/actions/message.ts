import { v4 as uuid } from 'uuid'
import { client } from '$config/supabase'
import { browser } from '$app/env'

export async function messageHandler(e: any) {
	const message: File = e.detail
	if (!message) return

	if (browser) {
		const storage = localStorage.getItem('supabase.auth.token')
		const currentSession = JSON.parse(storage)
		const { id } = currentSession.currentSession.user

		await client.storage.from('messages').upload(`${id}`, message)
	}
}
