<style>
	/* Code with help from the article at https://dev.to/afif/i-made-100-more-css-loaders-for-your-next-project-4ioa */
	div {
		width: var(--space-xxxl);
		height: var(--space-xxxl);
		display: grid;
		border-radius: 50%;
		-webkit-mask: radial-gradient(farthest-side, #0000 40%, #000 41%);
		background: linear-gradient(0deg, rgb(151 143 255/50%) 50%, rgb(151 143 255/100%) 0) center/4px
				100%,
			linear-gradient(90deg, rgb(151 143 255/25%) 50%, rgb(151 143 255/75%) 0) center/100% 4px;
		background-repeat: no-repeat;
		animation: s3 1s infinite steps(12);
	}

	div::before,
	div::after {
		content: '';
		grid-area: 1/1;
		border-radius: 50%;
		background: inherit;
		opacity: 0.915;
		transform: rotate(30deg);
	}

	div::after {
		opacity: 0.83;
		transform: rotate(60deg);
	}

	@keyframes s3 {
		100% {
			transform: rotate(1turn);
		}
	}
</style>

<div />
