<script>
	import { browser } from '$app/env'

	import { Icon } from '$atoms'
	import { Image } from '$atoms'
	import { AnchorIcon } from '$icons'

	export let pages: string[] = []
	export let selected: number = 0

	let dragging = false
	let offset = 0
	let dragstart = -1

	const isTouchCapable =
		browser &&
		('ontouchstart' in window ||
			(window.DocumentTouch && document instanceof window.DocumentTouch) ||
			navigator.maxTouchPoints > 0 ||
			window.navigator.msMaxTouchPoints > 0)

	function mouseClickHandler(e: Event) {
		dragging = e.type === 'mousedown' || e.type === 'touchstart'
		if (!dragging && offset > window.innerWidth / 2) {
			offset = 0
			dragstart = -1
			selected = (selected + 1) % pages.length
		} else if (!dragging && offset > (-1 * window.innerWidth) / 2) {
			offset = 0
			dragstart = -1
			selected = selected === 0 ? pages.length - 1 : selected - 1
		}
	}

	function mouseMoveHandler(e: MouseEvent) {
		if (!dragging) return
		offset += e.movementX * window.devicePixelRatio
	}

	function touchMoveHandler(e: TouchEvent) {
		if (!dragging) return
		if (dragstart === -1) dragstart = e.touches.item(0).clientX
		if (e.touches.length) offset = e.touches.item(0).clientX - dragstart
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
		right: var(--space-xs);
	}

	#previous {
		left: var(--space-xs);
	}

	div {
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

{#if isTouchCapable}
	<section>
		<button on:click={next} id="previous" type="button"><Icon><AnchorIcon /></Icon></button>
		<div
			on:touchstart|capture={mouseClickHandler}
			on:touchend|capture={mouseClickHandler}
			on:touchmove|capture={touchMoveHandler}
		>
			{#each [pages[selected === 0 ? pages.length - 1 : selected - 1], pages[selected], pages[(selected + 1) % pages.length]] as page, i (page + i)}
				<Image --index={i - 1} --offset="{offset}px" src={page} alt="Page preview" />
			{/each}
		</div>
		<button on:click={next} id="next" type="button"><Icon><AnchorIcon /></Icon></button>
	</section>
{:else}
	<section>
		<button on:click|stopPropagation={next} id="previous" type="button"
			><Icon><AnchorIcon /></Icon></button
		>
		<div
			on:mousedown|capture={mouseClickHandler}
			on:mouseup|capture={mouseClickHandler}
			on:mousemove|capture={mouseMoveHandler}
		>
			{#each [pages[selected === 0 ? pages.length - 1 : selected - 1], pages[selected], pages[(selected + 1) % pages.length]] as page, i (page + i)}
				<Image --index={i - 1} --offset="{offset}px" src={page} alt="Page preview" />
			{/each}
		</div>
		<button on:click|stopPropagation={next} id="next" type="button"
			><Icon><AnchorIcon /></Icon></button
		>
	</section>
{/if}
