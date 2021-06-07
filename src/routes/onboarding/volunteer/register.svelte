<script context="module">
	import { Register } from '$templates'
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page }) => {
		const from = page.query.get('from')

		return {
			props: {
				from,
			},
		}
	}
</script>

<script>
	export let from
</script>

<svelte:head>
	<title>Registreren</title>
</svelte:head>

<Register role="volunteer" {from} />
