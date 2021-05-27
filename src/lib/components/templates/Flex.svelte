<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: var(--height, calc(100% - 3em));
		width: inherit;
		padding: var(--space-m);
		text-align: var(--textAlign, initial);

		:global(h1) {
			align-self: flex-start;
		}
	}
</style>

<main>
	<slot />
</main>
