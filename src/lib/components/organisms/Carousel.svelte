<script>
	import { browser } from '$app/env'

	import { Icon } from '$atoms'
	import { Image } from '$atoms'
	import { AnchorIcon } from '$icons'

	export let pages: string[] = []
	export let selected: number = 0

	let dragging = false
	let offset = 0
	let moveStart = 0

	const isTouchCapable =
		browser &&
		('ontouchstart' in window ||
			(window.DocumentTouch && document instanceof window.DocumentTouch) ||
			navigator.maxTouchPoints > 0 ||
			window.navigator.msMaxTouchPoints > 0)

	function mouseClickHandler(e: MouseEvent) {
		dragging = e.type === 'mousedown'

		if (dragging) {
			moveStart = e.clientX
			return
		}
		if (offset < window.innerWidth / -8) selected = (selected + 1) % pages.length
		if (offset > window.innerWidth / 8) selected = selected === 0 ? pages.length - 1 : selected - 1

		offset = 0
		moveStart = 0
	}

	function touchHandler(e: TouchEvent) {
		dragging = e.type === 'touchstart'

		if (dragging) {
			moveStart = e.touches.item(0).clientX
			return
		}
		if (offset < window.innerWidth / -8) selected = (selected + 1) % pages.length
		if (offset > window.innerWidth / 8) selected = selected === 0 ? pages.length - 1 : selected - 1

		offset = 0
		moveStart = 0
	}

	function mouseMoveHandler(e: MouseEvent) {
		if (!dragging) return
		const { clientX } = e
		if (selected === 0) {
			offset = moveStart > clientX ? clientX - moveStart : 0
			return
		}
		if (selected === pages.length - 1) {
			offset = moveStart < clientX ? (moveStart - clientX) * -1 : 0
			return
		}
		offset = moveStart < clientX ? (moveStart - clientX) * -1 : clientX - moveStart
	}

	function touchMoveHandler(e: TouchEvent) {
		if (!dragging) return
		if (!e.touches.length) return
		const { clientX } = e.touches.item(0)
		if (selected === 0) {
			offset = moveStart > clientX ? clientX - moveStart : 0
			return
		}
		if (selected === pages.length - 1) {
			offset = moveStart < clientX ? (moveStart - clientX) * -1 : 0
			return
		}
		offset = moveStart < clientX ? (moveStart - clientX) * -1 : clientX - moveStart
	}

	const previous = () => {
		selected = selected === 0 ? 0 : selected - 1
	}

	const next = () => {
		selected = (selected + 1) % pages.length
	}
</script>

<style lang="scss">
	section {
		display: flex;
		align-items: center;
		height: 100%;
		position: relative;
		overflow: hidden;
		z-index: 0;
	}

	button {
		border: none;
		background: none;
		padding: 0;
		width: var(--space-l);
		height: var(--space-l);
		cursor: pointer;
		position: absolute;
		z-index: 1;

		@media (pointer: fine) {
			&:hover {
				:global(polyline) {
					stroke: var(--light);
				}
			}
		}
	}

	#next {
		transform: rotate(180deg);
		right: var(--space-m);
	}

	#previous {
		left: var(--space-m);
	}

	.pagination {
		position: absolute;
		top: var(--space-m);
		display: grid;
		width: 100%;
		justify-content: center;
		justify-items: center;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		column-gap: var(--space-xxs);
		padding: 0 var(--space-xl);

		span {
			display: block;
			width: 100%;
			height: 4px;
			border-radius: 2px;
			background: var(--grey);

			&.selected {
				background: var(--purple);
			}
		}
	}

	.image-container {
		position: relative;
		z-index: -1;
		width: 100%;
		height: 100%;

		:global(img) {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: contain;
			transform: translateX(calc(100% * var(--index) + var(--offset)));
		}
	}
</style>

<section>
	<div class="pagination">
		{#each pages as _, i (i)}
			<span class:selected={i === selected} />
		{/each}
	</div>
	{#if selected > 0}
		<button on:click={previous} id="previous" type="button"><Icon><AnchorIcon /></Icon></button>
	{/if}
	{#if isTouchCapable}
		<div
			class="image-container"
			on:touchstart|capture={touchHandler}
			on:touchend|capture={touchHandler}
			on:touchmove|capture={touchMoveHandler}
		>
			{#each pages as page, i (page + i)}
				<Image --index={i - selected} --offset="{offset}px" src={page} alt="Page preview" />
			{/each}
		</div>
	{:else}
		<div
			class="image-container"
			on:mousedown|capture={mouseClickHandler}
			on:mouseup|capture={mouseClickHandler}
			on:mousemove|capture={mouseMoveHandler}
		>
			{#each pages as page, i (page + i)}
				<Image --index={i - selected} --offset="{offset}px" src={page} alt="Page preview" />
			{/each}
		</div>
	{/if}
	{#if selected < pages.length - 1}
		<button on:click={next} id="next" type="button"><Icon><AnchorIcon /></Icon></button>
	{/if}
</section>
