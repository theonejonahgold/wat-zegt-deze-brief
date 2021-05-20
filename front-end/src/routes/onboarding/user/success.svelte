<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = ({ page }) => {
		const email = page.query.get('email')
		if (!email)
			return {
				status: 303,
				redirect: '/onboarding/user/register',
			}
		return {
			props: { email },
		}
	}
</script>

<script>
	import { Success } from '$templates'

	export let email: string
</script>

<Success {email} />
