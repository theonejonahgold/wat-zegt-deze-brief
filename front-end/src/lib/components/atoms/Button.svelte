<script>
	export let type: 'button' | 'anchor' = 'button'
</script>

<style>
	.button {
		display: block;
		border-radius: 2rem;
		color: white;
		padding: 1rem 0;
		text-align: center;
		font-size: 1.25em;
		text-decoration: none;
		background: linear-gradient(to right, #80b6fe, #978fff);
	}
</style>

{#if type === 'button'}
	<button class="button" on:click><slot /></button>
{:else}
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button" on:click {...$$restProps}><slot /></a>
{/if}
