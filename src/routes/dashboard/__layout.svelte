<script context="module">
	import { client } from '$config/supabase'
	import type { Load } from '@sveltejs/kit'

	export const load: Load = ({}) => {
		if (!client.auth.session().user)
			return {
				status: 303,
				redirect: '/login',
			}

		return {}
	}
</script>

<slot />
