<script>
	import { Back, Help, SpokenText } from '$atoms'
	import { Carousel } from '$organisms'
	import Header from './Header.svelte'

	export let title: string
	export let backLink: string
	export let selectedPage = 0

	export let pages: string[]
</script>

<style lang="scss">
	main.empty {
		display: grid;
		place-items: center;
	}

	footer {
		box-shadow: var(--bs-up);
		padding-top: var(--space-l);
		width: 100%;
		overflow-x: scroll;
	}
</style>

<Header>
	<Back slot="left" href={backLink} />
	<SpokenText --align="center" slot="middle" text={title} />
	<Help slot="right" />
</Header>
<main class:empty={!pages.length}>
	{#if pages.length || !$$slots.empty}
		<Carousel {pages} bind:selected={selectedPage} />
	{:else}
		<slot name="empty" />
	{/if}
</main>
<footer>
	<slot name="footer" />
</footer>
