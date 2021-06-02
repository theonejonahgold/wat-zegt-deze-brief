<script>
	export let href: string = ''
	export let bottom = false

	export let invert = false
</script>

<style lang="scss">
	button,
	a {
		display: block;
		border-radius: var(--space-xl);
		color: var(--secondary);
		padding: var(--space-xs) 0;
		margin-top: var(--space-m);
		text-align: center;
		font-size: var(--font-s);
		text-decoration: none;
		width: 100%;
		border: none;
		background: var(--gradient-to-right);
		box-shadow: var(--bs-button);

		&.bottom {
			position: absolute;
			bottom: var(--space-xl);
			left: var(--space-xl);
			width: calc(100% - (var(--space-xl) * 2));
		}

		&.inverted {
			color: var(--primary);
			background: var(--secondary);
		}
	}
</style>

{#if !href}
	<button class:inverted={invert} class:bottom on:click><slot /></button>
{:else}
	<a class:inverted={invert} class:bottom on:click {href}><slot /></a>
{/if}
