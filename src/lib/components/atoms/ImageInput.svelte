<script>
	export let name: string
</script>

<style lang="scss">
	label {
		border-radius: 50%;
		width: var(--space-xl);
		height: var(--space-xl);
		background: var(--dark);
		display: grid;
		place-content: center;
		place-items: center;
		position: relative;
		overflow: hidden;

		> :global(*) {
			grid-column: 1;
			grid-row: 1;
		}

		input {
			visibility: hidden;
			width: 100%;
		}

		&:after {
			content: '+';
			grid-row: 1;
			grid-column: 1;
			font-size: var(--font-l);
			color: var(--secondary);
			width: var(--space-xl);
			height: var(--space-xl);
			line-height: var(--space-xl);
			font-weight: 400;
			text-align: center;
		}
	}
</style>

<label>
	<input {name} accept="image/jpeg, image/png" on:change type="file" />
</label>
