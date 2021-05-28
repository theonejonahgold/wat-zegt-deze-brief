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
	}

	button {
		border: none;
		background-color: #e0e0e0;
		opacity: 0.8;
		padding: 0.8rem;
		width: 3rem;
		height: 3rem;
		cursor: pointer;
		position: absolute;
		z-index: 1;
	}

	#next {
		transform: rotate(180deg);
		right: 24px;
	}

	#previous {
		left: 24px;
	}

	button:hover {
		background-color: #bdbdbd;
	}

	div {
		position: relative;
		z-index: -1;
		margin: var(--space-s);
		width: 100%;

		:global(img) {
			width: 100%;
		}
	}
</style>

<section>
	<button on:click={next} id="previous"><Icon><AnchorIcon /></Icon></button>
	<div>
		{#each [pages[selected]] as page (selected)}
			<Image src={page} alt="Page preview" shadow={true} />
		{/each}
	</div>
	<button on:click={next} id="next"><Icon><AnchorIcon /></Icon></button>
</section>
