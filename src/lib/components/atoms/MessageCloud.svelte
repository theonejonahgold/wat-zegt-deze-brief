<script>
	export let text: string
	export let optionalClass: string = ''
</script>

<style>
	#container {
		background: #eaeaea;
		border: 1px solid #a7a7a7;
		border-radius: 4px;
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
		font-size: 1.1rem;
		max-width: 12rem;
		line-height: 1.4;
		padding: 1rem;
		position: relative;
		margin: 1rem 0 1rem 0;

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

	.you {
		align-self: flex-end;
	}
</style>

<div id="container" class={optionalClass}>
	<p>{text}</p>
	<div class="speech-bubble-arrow" />
</div>
