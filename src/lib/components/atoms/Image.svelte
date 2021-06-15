<script>
	export let src: string
	export let alt: string = ''
	export let drag = false
</script>

<style>
	img {
		display: inline-block;
	}
</style>

<img draggable={drag} on:dragstart on:drop on:dragover {src} {alt} aria-hidden={!alt} />
