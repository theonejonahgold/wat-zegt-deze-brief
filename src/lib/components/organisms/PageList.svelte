<script>
	import { Image } from '$atoms'
	import { afterUpdate, createEventDispatcher } from 'svelte'

	type DragAndDropEvent = DragEvent & { currentTarget: HTMLImageElement }

	export let pages: string[]
	export let selected: number

	let ul: HTMLUListElement

	const dispatch = createEventDispatcher<{
		remove: string
		move: {
			oldIndex: number
			newIndex: number
		}
	}>()

	function clickHandler(page: number) {
		return () => {
			selected = page
		}
	}

	function dragStartHandler(e: DragAndDropEvent) {
		e.dataTransfer.setData('text/plain', e.currentTarget.src)
		e.dataTransfer.dropEffect = 'move'
	}

	function dragOverHandler(e: DragAndDropEvent) {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	function dropHandler(e: DragAndDropEvent) {
		e.preventDefault()
		const data = e.dataTransfer.getData('text/plain')
		const oldIndex = pages.findIndex(page => page === data)
		const newIndex = pages.findIndex(page => page === e.currentTarget.src)
		dispatch('move', {
			oldIndex,
			newIndex,
		})
	}

	afterUpdate(() => {
		if (selected === pages.length - 1) ul.scrollLeft = ul.scrollWidth
	})
</script>

<style>
	ul {
		display: grid;
		grid-auto-columns: var(--space-xxxl);
		grid-auto-flow: column;
		list-style: none;
		margin: 0;
		padding: 0;
		column-gap: var(--space-s);
		width: 100%;
		align-items: center;
		overflow-x: auto;
		padding: var(--space-xs) 2px;
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

<ul bind:this={ul}>
	<slot />
	{#each pages as page, i}
		<li class:selected={selected === i} on:click={clickHandler(i)}>
			{#if selected === i}
				<button aria-label="Verwijderen" on:click|stopPropagation={() => dispatch('remove', page)}
					>&times;</button
				>
			{/if}
			<Image
				drag
				on:dragstart={dragStartHandler}
				on:dragover={dragOverHandler}
				on:drop={dropHandler}
				src={page}
			/>
		</li>
	{/each}
</ul>
