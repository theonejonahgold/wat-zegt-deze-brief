<script>
	export let px = 'var(--space-xl)'
	export let py = 'var(--space-l)'
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
		justify-content: var(--justify, space-between);
		width: inherit;
		padding: var(--pt) var(--pr) var(--pb) var(--pl);
		text-align: var(--textAlign, initial);

		&:first-child {
			padding-top: var(--pt, var(--space-s));
		}

		:global(h1) {
			align-self: flex-start;
		}
	}
</style>

<main style="--pt: {pt}; --pr: {pr}; --pb: {pb}; --pl: {pl};">
	<slot />
</main>
