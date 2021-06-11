<script>
	import Icon from './Icon.svelte'
	export let color = ''
	export let buttonColor: string = ' transparent'
	export let href = ''
</script>

<style>
	button,
	a {
		display: block;
		text-decoration: none;
		border-radius: 50%;
		background: var(--color, currentColor);
		border: none;
		width: 5rem;
		height: 5rem;
		cursor: pointer;
	}
</style>

{#if href}
	<a {href} on:click style="--color: {buttonColor}">
		<Icon {color}>
			<slot />
		</Icon>
	</a>
{:else}
	<button on:click style="--color: {buttonColor}">
		<Icon {color}>
			<slot />
		</Icon>
	</button>
{/if}
