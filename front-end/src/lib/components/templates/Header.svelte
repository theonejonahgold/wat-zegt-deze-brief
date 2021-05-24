<style>
	header {
		display: grid;
		grid-template-columns: var(--space-l) auto var(--space-l);
		column-gap: var(--space-m);
		align-items: center;
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
