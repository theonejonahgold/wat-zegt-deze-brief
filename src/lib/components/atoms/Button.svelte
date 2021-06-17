<script>
	export let href: string = ''
	export let bottom: 'sticky' | 'absolute' | false = false
	export let invert = false
</script>

<style lang="scss">
	button,
	a {
		display: block;
		border-radius: var(--space-xl);
		color: var(--secondary);
		padding: var(--space-m) 0;
		margin: 0;
		text-align: center;
		font-size: var(--font-s);
		font-weight: 500;
		text-decoration: none;
		width: 100%;
		border: none;
		background: var(--gradient-to-right);
		box-shadow: var(--bs-l-down);
		line-height: 1.125;

		+ :global {
			a,
			button {
				margin-top: var(--space-m);
			}
		}

		&.sticky {
			position: sticky;
			bottom: var(--space-xxl);
		}

		&.absolute {
			position: absolute;
			bottom: var(--space-xxl);
			width: calc(100% - (var(--space-xl) * 2));
		}

		&.inverted {
			color: var(--primary);
			background: var(--secondary);
		}
	}
</style>

{#if !href}
	<button class:inverted={invert} class={typeof bottom !== 'boolean' ? bottom : ''} on:click>
		<slot />
	</button>
{:else}
	<a class:inverted={invert} class={typeof bottom !== 'boolean' ? bottom : ''} on:click {href}>
		<slot />
	</a>
{/if}
