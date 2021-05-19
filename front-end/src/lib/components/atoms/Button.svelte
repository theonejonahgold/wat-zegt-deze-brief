<script>
	export let type: 'button' | 'anchor' = 'button'
</script>

<style>
	:global(:root) {
		--font-button: 'Avenir medium';
		--button-size: 1.125rem;
		--text-color: #ffffff;
		--button-background: linear-gradient(to right, #80b6fe, #978fff);
		--button-shadow: drop-shadow(0px 3px 8px #0000002a);
		--button-border-radius: 30px;
		--letter-spacing: 0.3px;
		--button-width: 18.375rem;
		--button-height: 3.313rem;
	}

	button {
		display: block;
		cursor: pointer;
		color: var(--text-color);
		font-size: var(--button-size);
		margin: auto;
		padding: 0;
		background: var(--button-background);
		filter: var(--button-shadow);
		border: none;
		border-radius: var(--button-border-radius);
		letter-spacing: var(--letter-spacing);
		width: var(--button-width);
		height: var(--button-height);
	}
</style>

{#if type === 'button'}
	<button on:click><slot /></button>
{:else}
	<!-- svelte-ignore a11y-missing-attribute -->
	<a on:click {...$$restProps}><slot /></a>
{/if}
