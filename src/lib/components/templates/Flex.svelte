<script>
	export let px = 'var(--space-m)'
	export let py = 'var(--space-m)'
	export let pt = '0'
	export let pl = px
	export let pr = px
	export let pb = py
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: inherit;
		padding: var(--pt) var(--pr) var(--pb) var(--pl);
		text-align: var(--textAlign, initial);

		&:first-child {
			padding-top: var(--pt, var(--space-m));
		}

		:global(h1) {
			align-self: flex-start;
		}
	}
</style>

<main style="--pt: {pt}; --pr: {pr}; --pb: {pb}; --pl: {pl};">
	<slot />
</main>
