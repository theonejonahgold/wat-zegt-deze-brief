<script>
	export let type: 'button' | 'anchor' = 'button'
</script>

{#if type === 'button'}
	<button on:click><slot /></button>
{:else}
	<!-- svelte-ignore a11y-missing-attribute -->
	<a on:click {...$$restProps}><slot /></a>
{/if}
