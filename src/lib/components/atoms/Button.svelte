<script>
	export let href: string = ''
	export let bottom = false
</script>

<style lang="scss">
	button,
	a {
		display: block;
		border-radius: var(--space-xxl);
		color: var(--secondary);
		padding: var(--space-m) 0;
		margin-top: var(--space-l);
		text-align: center;
		font-size: var(--font-m);
		text-decoration: none;
		width: 100%;
		border: none;
		background: var(--gradient-to-right);
		box-shadow: var(--bs-button);

		&.bottom {
			position: absolute;
			bottom: var(--space-m);
			left: var(--space-m);
			width: calc(100% - (var(--space-m) * 2));
		}
	}
</style>

{#if !href}
	<button class:bottom on:click><slot /></button>
{:else}
	<a class:bottom on:click {href}><slot /></a>
{/if}
