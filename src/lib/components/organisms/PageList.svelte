<script>
	import { Image } from '$atoms'
	import { createEventDispatcher } from 'svelte'

	export let pages: string[]
	export let selected: number

	const dispatch =
		createEventDispatcher<{
			remove: string
		}>()

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
		column-gap: var(--space-s);
		width: max-content;
		padding-right: var(--space-s);
	}

	li {
		position: relative;
		width: var(--space-xxxl);
		height: var(--space-xxxl);

		&.selected {
			outline: 2px solid var(--dark);
		}

		:global(img) {
			object-fit: cover;
			height: 100%;
			width: 100%;
		}
	}

	button {
		appearance: none;
		border: none;
		background: var(--gradient-to-right);
		color: var(--secondary);
		font-size: var(--font-m);
		width: var(--space-xl);
		height: var(--space-xl);
		border-radius: 50%;
		position: absolute;
		top: calc(-0.5 * var(--space-l));
		right: calc(-0.5 * var(--space-l));
	}
</style>

<ul>
	<slot />
	{#each pages as page, i}
		<li class:selected={selected === i} on:click={clickHandler(i)}>
			{#if selected === i}
				<button aria-label="Verwijderen" on:click|stopPropagation={() => dispatch('remove', page)}
					>&times;</button
				>
			{/if}
			<Image src={page} />
		</li>
	{/each}
</ul>
