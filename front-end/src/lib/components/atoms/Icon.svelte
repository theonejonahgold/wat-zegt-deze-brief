<script>
	export let color: string
</script>

<style lang="scss">
	div {
		display: contents;

		:global(svg) {
			fill: var(--color, currentColor);
		}
	}
</style>

<div style="--color: {color}">
	<slot />
</div>
