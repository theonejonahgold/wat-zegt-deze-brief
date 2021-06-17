<script>
	export let sticky = false
	export let shadow = false
</script>

<style>
	header {
		display: grid;
		grid-template-columns: var(--space-l) 1fr var(--space-l);
		column-gap: var(--space-s);
		align-items: start;
		justify-content: center;
		background: var(--background);
		z-index: 10;
		padding-top: var(--space-l);
		padding-bottom: var(--space-l);

		:global(p) {
			margin-top: -0.3em;
		}

		:global(#help) {
			margin-top: calc(var(--space-xl) / -16);
		}

		&.sticky {
			position: sticky;
			top: 0;
		}

		&.shadow {
			box-shadow: var(--bs-l-down);
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
