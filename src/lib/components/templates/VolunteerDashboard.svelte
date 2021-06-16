<script>
	import { Icon, SpokenText } from '$atoms'
	import { VolunteerLetterCard } from '$organisms'
	import Header from './Header.svelte'
	import type { Letter } from '$types'
	import { MailIcon } from '$icons'

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
		display: flex;
		flex-direction: column;
		justify-content: center;

		:global(p) {
			font-size: var(--font-m);
			margin-top: var(--space-xl);
			margin-bottom: var(--space-xxxl);
		}
	}

	main {
		padding-top: 0;
	}

	div {
		height: 10rem;
		opacity: 0.6;
	}
</style>

<Header sticky>
	<SpokenText --align="center" slot="middle" text="Brieven" />
</Header>
<main class:empty={!letters.length}>
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
			text="Op dit moment wordt iedereen al geholpen, kom later terug!"
			--align="center"
		/>
	{/if}
</main>
