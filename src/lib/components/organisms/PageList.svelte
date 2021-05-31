<script>
	import { Image } from '$atoms'

	export let pages: string[]
	export let selected: number

	function clickHandler(page: number) {
		return () => {
			selected = page
		}
	}
</script>

<style>
	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		column-gap: var(--space-m);
		width: max-content;
		padding-right: var(--space-m);
	}

	li {
		width: var(--space-xl);
		height: var(--space-xl);

		&.selected {
			outline: 2px solid var(--dark);
		}

		:global(img) {
			object-fit: cover;
			height: 100%;
		}
	}
</style>

<ul>
	<slot />
	{#each pages as page, i}
		<li class:selected={selected === i} on:click={clickHandler(i)}>
			<Image src={page} />
		</li>
	{/each}
</ul>
