<script context="module">
	export const load: Load = async () => {
		const role = await checkRole()

		if (!role || role === 'user')
			return {
				redirect: '/dashboard',
				status: 302,
			}

		const data = await dashboardLetters({ assigned: true })

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
	import { dashboardLetters } from '$db/letter'
	import { checkRole } from '$db/user'
	import { client } from '$config/supabase'
	import { Icon, SpokenText } from '$atoms'
	import { VolunteerLetterCard } from '$organisms'
	import { Header } from '$templates'
	import { MailIcon, LetterIcon, ChatIcon } from '$icons'
	import { NavBar } from '$templates'
	import type { Letter } from '$types'

	export let letters: Letter[]
</script>

<style>
	main {
		padding-top: 0;
	}

	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-l);
		margin-top: var(--space-xxs);
	}

	.empty {
		:global(div:last-child p) {
			font-size: var(--font-m);
			margin-top: var(--space-xl);
		}
	}

	div {
		height: 10rem;
		opacity: 0.6;
	}
</style>

<Header>
	<SpokenText --align="center" slot="middle" text="Chats" />
</Header>
<main class:empty={!letters.length}>
	<section>
		{#if letters.length}
			<ul>
				{#each letters as letter (letter.id)}
					<li>
						<VolunteerLetterCard {letter} />
					</li>
				{/each}
			</ul>
		{:else}
			<div>
				<Icon>
					<MailIcon />
				</Icon>
			</div>
			<SpokenText
				text="Je hebt nog geen chats, ga naar het overzicht van de brieven om aan de slag te gaan!"
				--align="center"
			/>
		{/if}
	</section>
</main>
<NavBar
	links={[
		{
			href: '/dashboard/chat',
			icon: ChatIcon,
		},
		{
			href: '/dashboard',
			icon: LetterIcon,
		},
	]}
/>
