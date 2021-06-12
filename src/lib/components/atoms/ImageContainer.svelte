<script>
	import Image from './Image.svelte'

	export let background = false
	export let src: string
	export let alt = ''
</script>

<style lang="scss">
	div {
		width: 100%;
		padding: var(--space-xxl);
		border-radius: var(--border-radius);
		display: flex;
		justify-content: center;

		&.background {
			background: var(--secondary);
		}

		:global(img) {
			width: 100%;
			max-height: 14em;
			object-fit: contain;
		}
	}
</style>

<div class:background>
	<Image {src} {alt} />
</div>
