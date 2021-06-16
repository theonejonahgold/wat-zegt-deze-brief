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

	main {
		padding: 0;
		position: relative;
		z-index: -1;
	}

	footer {
		box-shadow: var(--bs-l-up);
		padding: var(--space-xl) var(--space-l);
	}
</style>

<Header shadow>
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
{#if $$slots.footer}
	<footer>
		<slot name="footer" />
	</footer>
{:else if $$slots['footer-full'] && pages.length}
	<footer>
		<slot name="footer-full" />
	</footer>
{:else if $$slots['footer-empty'] && !pages.length}
	<footer>
		<slot name="footer-empty" />
	</footer>
{/if}
