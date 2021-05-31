<script>
	import { Back, Help, SpokenText } from '$atoms'
	import { Carousel, PageList } from '$organisms'
	import Header from './Header.svelte'

	export let title: string
	export let backLink: string
	export let selectedPage = 0

	export let pages: string[]
</script>

<style lang="scss">
	main {
		:global {
			label:nth-child(1) {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}

	footer {
		box-shadow: var(--bs-up);
		padding-top: var(--space-m);
		width: 100%;
		overflow-x: scroll;
	}
</style>

<Header>
	<Back slot="left" href={backLink} />
	<SpokenText --align="center" slot="middle" text={title} />
	<Help slot="right" />
</Header>
<main>
	{#if pages.length || !$$slots.empty}
		<Carousel slot="main" {pages} bind:selected={selectedPage} />
	{:else}
		<slot name="empty" />
	{/if}
</main>
<footer>
	<PageList bind:selected={selectedPage} {pages}>
		<slot name="footer-item" />
	</PageList>
</footer>
