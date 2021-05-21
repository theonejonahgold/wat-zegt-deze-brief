<script>
	export let src: string
	export let alt: string = ''
</script>

<style>
	img {
		display: inline-block;
		width: 100%;
	}
</style>

<img {src} {alt} aria-hidden={!alt} />
