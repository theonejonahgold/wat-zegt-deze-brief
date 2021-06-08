<script>
	export let color: string = ''
</script>

<style lang="scss">
	div {
		display: block;
		width: 100%;
		height: 100%;

		:global(svg) {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>

<div style="--color: {color}">
	<slot />
</div>
