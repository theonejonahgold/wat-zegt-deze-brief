<script context="module">
	export const load: Load = async () => {
		const data = await dashboardLetters(false)
		const role = await checkRole()

		if (!role)
			return {
				redirect: '/login',
				status: 302,
			}

		const letters = (
			await Promise.all<Letter>(
				data.map(letter =>
					letter.page_order?.length
						? client.storage
								.from('pages')
								.createSignedUrl(`${letter.id}/${letter.page_order[0]}`, 40)
								.then(({ signedURL }) => ({
									...letter,
									image: signedURL,
								}))
						: new Promise(resolve => resolve(letter))
				)
			)
		).sort(
			(a, b) =>
				new Date(b.messages ? b.messages[b.messages.length - 1].date : b.createdAt).valueOf() -
				new Date(a.messages ? a.messages[a.messages.length - 1].date : a.createdAt).valueOf()
		)

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
	import { dashboardLetters } from '$db/letter'
	import { checkRole } from '$db/user'
	import { UserDashboard, VolunteerDashboard } from '$templates'
	import type { Letter } from '$types'

	export let letters: Letter[]
	export let role: 'user' | 'volunteer'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if role === 'user'}
	<UserDashboard {letters} />
{:else if role === 'volunteer'}
	<VolunteerDashboard {letters} />
{/if}
