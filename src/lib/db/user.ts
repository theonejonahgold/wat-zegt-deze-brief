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

	const { user, error, session } = await client.auth.signUp({ email, password })
	if (error) throw error

	const { error: otherError } = await client
		.from<User>('users')
		.update({ user_role: role, name, languages })
		.eq('id', user!.id)
	if ((<any>otherError)?.length) throw otherError

	return session
}

export async function login({ email, password }: { email: string; password: string }) {
	return await client.auth.signIn({ email, password })
}

export async function checkRole() {
	// const user_id = client.auth.currentUser.id
	// if (!user_id) return

	return 'volunteer'

	// let { data, error } = await supabase.rpc('is_role', {
	// 	user_id,
	// 	u_role: 'user',
	// })

	// if (error) console.error(error)
	// else console.log(data)
}
