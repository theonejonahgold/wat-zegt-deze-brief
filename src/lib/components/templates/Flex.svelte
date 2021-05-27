<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: var(--height, 100vh);
		width: inherit;
		padding: var(--space-m);

		:global(h1) {
			align-self: flex-start;
		}
	}
</style>

<main>
	<slot />
</main>
