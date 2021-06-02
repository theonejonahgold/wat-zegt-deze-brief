<script>
	import Icon from './Icon.svelte'
	export let color = ''
	export let href = ''
</script>

<style>
	button,
	a {
		display: block;
		text-decoration: none;
		background: none;
		border: none;
		width: 5rem;
		height: 5rem;
		cursor: pointer;
	}
</style>

{#if href}
	<a {href}>
		<Icon {color}>
			<slot />
		</Icon>
	</a>
{:else}
	<button on:click>
		<Icon {color}>
			<slot />
		</Icon>
	</button>
{/if}
