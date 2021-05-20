<script>
	export let href: string = ''
</script>

<style>
	button,
	a {
		display: block;
		border-radius: var(--space-l);
		color: var(--secondary);
		padding: var(--space-m) 0;
		text-align: center;
		font-size: var(--font-m);
		text-decoration: none;
		width: 100%;
		border: none;
		background: var(--gradient-to-right);
	}
</style>

{#if !href}
	<button on:click><slot /></button>
{:else}
	<a on:click {href}><slot /></a>
{/if}
