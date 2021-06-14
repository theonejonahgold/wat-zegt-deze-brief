<script>
	import Icon from './Icon.svelte'
	export let color = ''
	export let buttonColor: string = ' transparent'
	export let href = ''
	export let small = false
</script>

<style lang="scss">
	button,
	a {
		display: block;
		text-decoration: none;
		border-radius: 50%;
		background: var(--color, currentColor);
		border: none;
		width: var(--space-xxxl);
		height: var(--space-xxxl);
		cursor: pointer;
		padding: var(--space-xs);

		&.small {
			height: var(--space-xxl);
			width: var(--space-xxl);
		}
	}
</style>

{#if href}
	<a {href} class:small on:click style="--color: {buttonColor}">
		<Icon {color}>
			<slot />
		</Icon>
	</a>
{:else}
	<button class:small on:click style="--color: {buttonColor}">
		<Icon {color}>
			<slot />
		</Icon>
	</button>
{/if}
