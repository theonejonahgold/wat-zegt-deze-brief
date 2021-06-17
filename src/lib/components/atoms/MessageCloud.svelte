<script>
	export let you = false
</script>

<style>
	.container {
		background: #eaeaea;
		border: 1px solid var(--light-grey);
		border-radius: 4px;
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
		font-size: var(--font-s);
		max-width: 12rem;
		line-height: 1.4;
		padding: var(--space-s);
		position: relative;
		margin-bottom: var(--space-xl);

		p {
			margin-bottom: 2px;

			:last-of-type {
				margin-bottom: 0;
			}
		}
	}

	.container div {
		border-top: 20px solid rgba(0, 0, 0, 0.2);
		bottom: -25px;
		position: absolute;

		&:before {
			border-top: 23px solid var(--light-grey);
			bottom: 2px;
			content: '';
			position: absolute;
		}
		&:after {
			border-top: 21px solid #efefef;
			bottom: 4px;
			content: '';
			position: absolute;
		}
	}

	.container.you div {
		border-left: 21px solid transparent;
		right: 15px;
		&:before {
			border-left: 23px solid transparent;
			right: 5px;
		}
		&:after {
			border-left: 21px solid transparent;
			right: 6px;
		}
	}
	.container:not(.you) div {
		border-right: 21px solid transparent;
		left: 15px;
		&:before {
			border-right: 23px solid transparent;
			left: -3px;
		}
		&:after {
			border-right: 21px solid transparent;
			left: -4px;
		}
	}
</style>

<div class="container" class:you>
	{#if $$slots.default}
		<p><slot /></p>
	{/if}
	<slot name="misc" />
	<div />
</div>
