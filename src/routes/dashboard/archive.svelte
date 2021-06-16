<script context="module">
	export const load: Load = async () => {
		const data = await dashboardLetters(true)
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
	import { dashboardLetters } from '$db/letter'
	import { checkRole } from '$db/user'
	import { client } from '$config/supabase'
	import { Back, Help, Icon, SpokenText } from '$atoms'
	import { UserLetterCard } from '$organisms'
	import { Header } from '$templates'
	import { MailIcon } from '$icons'
	import type { Letter } from '$types'

	export let letters: Letter[]
</script>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-s);
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
	<Back slot="left" href="/dashboard" />
	<SpokenText --align="center" slot="middle" text="Archief" />
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
			<SpokenText text="Er zitten nog geen brieven in jouw archief" --align="center" />
		{/if}
	</section>
</main>
