<script>
	import Image from './Image.svelte'

	export let src: string
	export let alt = ''
</script>

<style lang="scss">
	div {
		width: 100%;
		padding: var(--space-xxl);
		background: var(--secondary);
		border-radius: var(--border-radius);
		display: flex;
		justify-content: center;

		:global(img) {
			width: 100%;
			max-height: 14em;
			object-fit: contain;
		}
	}
</style>

<div>
	<Image {src} {alt} />
</div>
