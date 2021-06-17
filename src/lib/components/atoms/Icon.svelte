<script>
	export let color: string = ''
</script>

<style lang="scss">
	div {
		display: block;
		width: 100%;
		height: 100%;
		position: relative;

		:global(svg) {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			fill: var(--color);
		}
	}
</style>

<div style="--color: {color}">
	<slot />
</div>
