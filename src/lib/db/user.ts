import { client } from '$config/supabase'
import type { User } from '$types'

export async function register({
	email,
	password,
	role,
	name = '',
	languages,
}: {
	email: string
	password: string
	role: string
	name?: string
	languages: string[]
}) {
	if (!role) throw 'Please provide a user role'

	const { user, error } = await client.auth.signUp({ email, password })
	if (error) throw error

	const { error: otherError } = await client
		.from<User>('users')
		.update({ user_role: role, name, languages })
		.eq('id', user!.id)
	if ((<any>otherError)?.length) throw otherError
}

export async function login({ email, password }: { email: string; password: string }) {
	await client.auth.signIn({ email, password })
}
