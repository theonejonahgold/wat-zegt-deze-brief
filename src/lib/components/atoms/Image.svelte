<script>
	export let src: string
	export let alt: string = ''
	export let shadow: boolean = false
</script>

<style>
	.shadow {
		box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12),
			0 3px 5px -1px rgba(0, 0, 0, 0.2);
	}

	img {
		display: inline-block;
	}
</style>

<img {src} {alt} aria-hidden={!alt} class={shadow ? 'shadow' : ''} />
