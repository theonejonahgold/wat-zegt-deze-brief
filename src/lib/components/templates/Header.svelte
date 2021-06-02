<style>
	header {
		display: grid;
		grid-template-columns: var(--space-m) 1fr var(--space-m);
		column-gap: var(--space-s);
		align-items: center;
		justify-content: center;

		> :global(*) {
			line-height: 1;
		}
	}
</style>

<header>
	<div>
		<slot name="left" />
	</div>
	<div>
		<slot name="middle" />
	</div>
	<div>
		<slot name="right" />
	</div>
</header>
