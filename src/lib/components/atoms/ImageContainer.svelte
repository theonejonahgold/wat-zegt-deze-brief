<script>
	import Image from './Image.svelte'

	export let background = false
	export let src: string
	export let alt = ''
</script>

<style lang="scss">
	div {
		width: 100%;
		height: 100%;
		border-radius: var(--border-radius);
		position: relative;

		&.background {
			background: var(--secondary);
		}

		:global(img) {
			position: absolute;
			padding: var(--space-xxl) 0;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
</style>

<div class:background>
	<Image {src} {alt} />
</div>
