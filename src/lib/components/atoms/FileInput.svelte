<script>
	export let name: string
</script>

<style lang="scss">
	label {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		> :global(*) {
			grid-column: 1;
			grid-row: 1;
		}

		input {
			display: inline-block;
			visibility: hidden;
			width: 1px;
			height: 1px;
		}

		&:before {
			content: '+';
			font-size: var(--font-l);
			border-radius: 50%;
			background: var(--gradient-to-right);
			color: var(--secondary);
			line-height: calc(var(--space-xxl) + (var(--font-l) * 0.14));
			height: var(--space-xxl);
			width: var(--space-xxl);
			font-weight: 400;
			text-align: center;
			margin-bottom: 0.2em;
		}
	}
</style>

<label>
	<input {name} accept="image/jpeg, image/png" on:change type="file" />
	<slot />
</label>
