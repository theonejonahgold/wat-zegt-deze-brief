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
	export let email: string
</script>

<h1>Bevestig je e-mailadres</h1>
<p>Je hebt een e-mail van ons gekregen op {email}</p>
