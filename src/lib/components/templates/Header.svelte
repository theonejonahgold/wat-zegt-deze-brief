<script>
	export let sticky = false
	export let shadow = false
</script>

<style>
	header {
		display: grid;
		grid-template-columns: var(--space-m) 1fr var(--space-m);
		column-gap: var(--space-s);
		align-items: center;
		justify-content: center;
		background: var(--background);

		> :global(*) {
			line-height: 1;
		}

		&.sticky {
			position: sticky;
			top: 0;
		}
		&.shadow {
			box-shadow: var(--bs-down);
		}
	}
</style>

<header class:shadow class:sticky>
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
