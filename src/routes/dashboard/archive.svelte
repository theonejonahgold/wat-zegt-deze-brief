<script context="module">
	export const load: Load = async () => {
		const role = await checkRole()

		if (!role || role === 'volunteer')
			return {
				redirect: '/dashboard',
				status: 302,
			}

		const data = await dashboardLetters({ status: ['resolved'] })

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
	import { Back, Help, Icon, SpokenText } from '$atoms'
	import { UserLetterCard } from '$organisms'
	import { Header, NavBar } from '$templates'
	import { ArchiveIcon, LetterIcon, MailIcon } from '$icons'
	import type { Letter } from '$types'

	export let letters: Letter[]
</script>

<style>
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

<svelte:head>
	<title>Uitgelegd</title>
</svelte:head>

<Header>
	<SpokenText --align="center" slot="middle" text="Uitgelegd" />
	<Help slot="right" />
</Header>
<main class:empty={!letters.length}>
	<section>
		{#if letters.length}
			<ul>
				{#each letters as letter (letter.id)}
					<li>
						<UserLetterCard {letter} />
					</li>
				{/each}
			</ul>
		{:else}
			<div>
				<Icon>
					<MailIcon />
				</Icon>
			</div>
			<SpokenText text="Je hebt nog geen uitgelegde brieven" --align="center" />
		{/if}
	</section>
</main>
<NavBar
	links={[
		{
			href: '/dashboard/archive',
			icon: ArchiveIcon,
		},
		{
			href: '/dashboard',
			icon: LetterIcon,
		},
	]}
/>
