<script>
	export let src: string
	export let alt: string = ''
	export let shadow: boolean = false
	export let drag = false
</script>

<style>
	.shadow {
		box-shadow: var(--bs-key-ambient-light);
	}

	img {
		display: inline-block;
	}
</style>

<img
	draggable={drag}
	on:dragstart
	on:drop
	on:dragover
	{src}
	{alt}
	aria-hidden={!alt}
	class={shadow ? 'shadow' : ''}
/>
