<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: var(--height, calc(100% - 4em));
		width: inherit;
		padding: 0 var(--space-m) var(--space-m);
		text-align: var(--textAlign, initial);

		&:first-child {
			padding-top: var(--space-m);
		}

		:global(h1) {
			align-self: flex-start;
		}
	}
</style>

<main>
	<slot />
</main>
