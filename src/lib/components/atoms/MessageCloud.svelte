<script>
	export let text: string
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

	div > div {
		border-left: 21px solid transparent;
		border-top: 20px solid rgba(0, 0, 0, 0.2);
		bottom: -25px;
		position: absolute;
		right: 15px;

		&::before {
			border-left: 23px solid transparent;
			border-top: 23px solid var(--light-grey);
			bottom: 2px;
			content: '';
			position: absolute;
			right: 5px;
		}
		&::after {
			border-left: 21px solid transparent;
			border-top: 21px solid #efefef;
			bottom: 4px;
			content: '';
			position: absolute;
			right: 6px;
		}
	}
</style>

<div class="container">
	<p>{text}</p>
	<div />
</div>
