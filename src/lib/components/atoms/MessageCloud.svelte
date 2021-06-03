<script>
	export let text: string
</script>

<style>
	.speech-bubble {
		background: #eaeaea;
		border: 1px solid #a7a7a7;
		border-radius: 4px;
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
		font-size: 1.1rem;
		line-height: 1.4;
		max-width: 200px;
		padding: 8px;
		position: relative;

		p {
			margin-bottom: 2px;

			:last-of-type {
				margin-bottom: 0;
			}
		}
	}

	.speech-bubble-arrow {
		border-left: 21px solid transparent;
		border-top: 20px solid rgba(0, 0, 0, 0.2);
		bottom: -25px;
		position: absolute;
		right: 15px;

		&::before {
			border-left: 23px solid transparent;
			border-top: 23px solid #a7a7a7;
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

<div class="speech-bubble">
	<p>{text}</p>
	<div class="speech-bubble-arrow" />
</div>
