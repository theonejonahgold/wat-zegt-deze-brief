<script>
	import { Icon } from '$atoms'
	import { Image } from '$atoms'
	import { AnchorIcon } from '$icons'

	export let pages: string[]
	export let selected: number = 0

	const next = () => {
		selected = (selected + 1) % pages.length
	}
</script>

<style>
	section {
		display: flex;
		align-items: center;
		height: 100%;
		position: relative;
	}

	button {
		border: none;
		background: none;
		opacity: 0.8;
		padding: var(--space-s);
		width: 3rem;
		height: 3rem;
		cursor: pointer;
		position: absolute;
		z-index: 1;
	}

	#next {
		transform: rotate(180deg);
		right: var(--space-s);
	}

	#previous {
		left: var(--space-s);
	}

	button:hover {
		background-color: var(--grey);
	}

	div {
		position: relative;
		z-index: -1;
		margin: var(--space-s);
		width: 100%;

		:global(img) {
			width: 100%;
			height: auto;
		}
	}
</style>

<section>
	<button on:click={next} id="previous" type="button"><Icon><AnchorIcon /></Icon></button>
	<div>
		{#each [pages[selected]] as page (selected)}
			<Image src={page} alt="Page preview" shadow={true} />
		{/each}
	</div>
	<button on:click={next} id="next" type="button"><Icon><AnchorIcon /></Icon></button>
</section>
