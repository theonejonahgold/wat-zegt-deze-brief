import { Router } from 'express'
import { frontEndOrigin } from '$config/env'
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
				.then(({ error }) => {
					if (error) throw error
					return req.headers.accept !== 'application/json'
						? res
								.status(303)
								.redirect(`${frontEndOrigin}/onboarding/${role}/success?email=${email}`)
						: res.status(200).send({ email })
				})
		})
		.catch(error => res.status(400).send(error.message))
})

export { userRouter }
