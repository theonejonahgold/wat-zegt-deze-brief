<script context="module">
	export const load: Load = async () => {
		const { data } = await listLetters()

		const letters = data
			? (
					await Promise.all(
						data?.map(letter =>
							client.storage
								.from('public')
								.createSignedUrl(`${letter.id}/image.jpeg`, 40)
								.then(({ signedURL }) => ({
									...letter,
									image: signedURL,
								}))
						)
					)
			  ).sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
			: []
		return {
			props: {
				letters,
			},
		}
	}
</script>

<script>
	import type { Load } from '@sveltejs/kit'
	import { client } from '$config/supabase'
	import { listLetters } from '$db/letter'
	import { UserDashboard, VolunteerDashboard } from '$templates'
	import type { Letter } from '$types'

	export let letters: Letter[]
	export let role: 'user' | 'volunteer'
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

{#if role === 'user'}
	<UserDashboard {letters} />
{:else if role === 'volunteer'}
	<VolunteerDashboard {letters} />
{/if}
