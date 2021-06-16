<script>
	export let name: string
	export let large = false
</script>

<style lang="scss">
	label {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		height: var(--space-xxxl);
		justify-content: space-between;

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

		span {
			line-height: 1;
		}

		&:before {
			content: '+';
			display: block;
			font-size: var(--font-m);
			border-radius: 50%;
			background: var(--gradient-to-right);
			color: var(--secondary);
			line-height: calc(var(--space-xl) + (var(--font-m) * 0.14));
			height: var(--space-xl);
			width: var(--space-xl);
			font-weight: 400;
			text-align: center;
		}
	}

	.large {
		&:before {
			font-size: var(--font-l);
			line-height: calc(var(--space-xxl) + (var(--font-l) * 0.14));
			height: var(--space-xxl);
			width: var(--space-xxl);
			margin-bottom: 0.2em;
		}
	}
</style>

<label class:large>
	<input {name} accept="image/jpeg, image/png" on:change type="file" />
	<span>
		<slot />
	</span>
</label>
