<script>
	export let src: string
	export let alt: string = ''
	export let shadow: boolean = false
</script>

<style>
	.shadow {
		box-shadow: var(--bs-key-ambient-light);
	}

	img {
		display: inline-block;
	}
</style>

<img {src} {alt} aria-hidden={!alt} class={shadow ? 'shadow' : ''} />
