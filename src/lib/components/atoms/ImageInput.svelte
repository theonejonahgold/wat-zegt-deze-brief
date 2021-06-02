<script>
	export let name: string
</script>

<style lang="scss">
	label {
		border-radius: 50%;
		width: var(--space-xxxl);
		height: var(--space-xxxl);
		background: var(--gradient-to-right);
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
			width: 100%;
			height: 100%;
			line-height: var(--space-xxxl);
			font-weight: 400;
			text-align: center;
		}
	}
</style>

<label>
	<input {name} accept="image/jpeg, image/png" on:change type="file" />
</label>
