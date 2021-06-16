<script>
	import { page } from '$app/stores'

	import { Icon } from '$atoms'
	import type { SvelteElement } from 'svelte/internal'

	export let links: Array<{
		href: string
		icon: typeof SvelteElement
	}> = []
</script>

<style>
	footer {
		padding: 0;
		position: sticky;
		bottom: 0;
	}

	nav {
		background-color: var(--secondary);
		box-shadow: var(--bs-m-up);
		width: 100%;
	}

	ul {
		padding: 0;
		display: grid;
		justify-content: space-around;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		align-items: center;
		list-style-type: none;
	}

	li {
		display: block;
		padding: var(--space-xs) 0;
		text-align: center;
		width: 100%;

		:global(a) {
			display: block;
			text-decoration: none;
			cursor: pointer;
			height: var(--space-xxl);
		}

		:global(a svg) {
			height: var(--space-xxl);
		}
	}
</style>

<footer>
	<nav>
		<ul>
			{#each links as link (link.href)}
				<li>
					<a href={link.href}
						><Icon color={$page.path === link.href ? 'var(--dark)' : 'var(--grey)'}
							><svelte:component this={link.icon} /></Icon
						></a
					>
				</li>
			{/each}
		</ul>
	</nav>
</footer>
