<script>
	export let src: string
	export let alt: string = ''
</script>

<style>
	img {
		display: inline-block;
	}
</style>

<img {src} {alt} aria-hidden={!alt} />
