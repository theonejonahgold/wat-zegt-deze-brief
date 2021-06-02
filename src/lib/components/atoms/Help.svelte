<script>
	export let href: string = ''
</script>

<style>
	button,
	a {
		text-decoration: none;
		appearance: none;
		display: block;
		background: var(--secondary);
		font-family: var(--font-family);
		color: var(--dark);
		width: var(--space-xl);
		height: var(--space-xl);
		line-height: 1em;
		text-align: center;
		font-size: var(--font-s);
		padding: 0;
		font-weight: 700;
		border: 1px solid var(--dark);
		border-radius: 50%;
	}

	a {
		line-height: 1.3em;
	}
</style>

{#if !href}
	<button on:click aria-label="Leg dit scherm uit">?</button>
{:else}
	<a on:click {href} aria-label="Leg dit scherm uit">?</a>
{/if}
