import { Router } from 'express'
import { getSupabaseClient } from '$config/supabase'
import { definitions } from '$types/supabase'

const client = getSupabaseClient()

const userRouter = Router().post('/register', (req, res) => {
	const { email, password, role } = req.body
	if (!role) return res.status(400).send('No user role was provided.')
	client.auth
		.signUp({
			email,
			password,
		})
		.then(({ user, error }) => {
			if (error) throw error
			client
				.from<definitions['users']>('users')
				.update({ role })
				.eq('id', user!.id)
				.then(({ data }) => {
					if (error) throw error
					res.status(200).send({ data })
				})
		})
		.catch(error => res.status(400).send(error.message))
})

export { userRouter }
