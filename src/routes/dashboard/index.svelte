<script context="module">
	export const load: Load = async () => {
		const { data } = await listLetters()
		const role = await checkRole()

		if (!role)
			return {
				redirect: '/login',
				status: 302,
			}

		const letters = data
			? (
					await Promise.all(
						data?.map(letter =>
							client.storage
								.from('pages')
								.createSignedUrl(`${letter.id}/${letter.thumbnail}`, 40)
								.then(({ signedURL }) => ({
									...letter,
									image: signedURL,
								}))
						)
					)
			  ).sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
			: []
		console.log(letters)
		return {
			props: {
				letters,
				role,
			},
		}
	}
</script>

<script>
	import type { Load } from '@sveltejs/kit'
	import { client } from '$config/supabase'
	import { listLetters } from '$db/letter'
	import { checkRole } from '$db/user'
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
