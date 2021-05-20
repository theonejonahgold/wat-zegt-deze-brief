<script>
	export let href: string = ''
</script>

<style>
	button,
	a {
		display: block;
		border-radius: 2rem;
		color: white;
		padding: 1rem 0;
		text-align: center;
		font-size: 1.25em;
		text-decoration: none;
		width: 100%;
		border: none;
		background: linear-gradient(to right, #80b6fe, #978fff);
	}
</style>

{#if !href}
	<button on:click><slot /></button>
{:else}
	<a on:click {href}><slot /></a>
{/if}
