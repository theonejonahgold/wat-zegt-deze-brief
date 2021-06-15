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
		if (!pages.length) return

		const lItemOffsetLeft = ul.children[selected].offsetLeft

		/* Also use offsetWidth of button, as it pokes outside of the list-item.
		We take 33% as it only sticks out 33% of the way. */
		const lItemOffsetWidth =
			ul.children[selected].offsetWidth + ul.children[selected].children[0].offsetWidth / 3

		if (
			lItemOffsetLeft + lItemOffsetWidth > ul.scrollLeft + ul.offsetWidth ||
			lItemOffsetLeft < ul.scrollLeft
		)
			// Minus 2px for outline
			ul.scrollLeft = lItemOffsetLeft - 2
	})
</script>

<style>
	ul {
		display: grid;
		list-style: none;
		grid-template-columns: var(--space-xxxl);
		grid-auto-flow: column;
		column-gap: calc(var(--space-xxl) * 1);
		margin: 0;
		padding: 0;
		width: 100%;
		align-items: center;
		overflow-x: auto;
		padding: var(--space-xs) 2px;
		position: relative;
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
		all: unset;
		text-align: center;
		appearance: none;
		border: none;
		background: var(--gradient-to-right);
		color: var(--secondary);
		font-size: var(--font-m);
		width: var(--space-xl);
		height: var(--space-xl);
		border-radius: 50%;
		position: absolute;
		top: calc(-0.33 * var(--space-xl));
		right: calc(-0.33 * var(--space-xl));
	}
</style>

<ul bind:this={ul} style="--amount: {pages.length}">
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
