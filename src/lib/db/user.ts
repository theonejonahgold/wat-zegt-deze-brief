import { client } from '$config/supabase'
import type { definitions } from '$types'

export async function register({
	email,
	password,
	role,
	name,
}: {
	email: string
	password: string
	role: string
	name?: string
}) {
	const { user, error } = await client.auth.signUp({ email, password })
	if (error) throw error

	const { error: otherError } = await client
		.from<definitions['users']>('users')
		.update({ role, name: name ?? '' })
		.eq('id', user!.id)
	if ((<any>otherError)?.length) throw otherError
}
