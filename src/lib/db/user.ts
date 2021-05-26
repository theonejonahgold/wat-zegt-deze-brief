import { client } from '$config/supabase'
import type { definitions } from '$types'

export async function register({
	email,
	password,
	role,
	name = '',
}: {
	email: string
	password: string
	role: string
	name?: string
}) {
	if (!role) throw 'Please provide a user role'
	
	const { user, error } = await client.auth.signUp({ email, password })
	if (error) throw error

	const { error: otherError } = await client
		.from<definitions['users']>('users')
		.update({ user_role: role, name })
		.eq('id', user!.id)
	if ((<any>otherError)?.length) throw otherError
}

export async function login({ email, password }: { email: string; password: string }) {
	await client.auth.signIn({ email, password })
}
