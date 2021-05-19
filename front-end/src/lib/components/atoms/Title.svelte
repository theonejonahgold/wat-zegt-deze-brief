<style>
	:global(:root) {
		--font: 'Avenir Black';
		--title-size: 2.5rem;
		--letter-spacing: 0.3px;
		--title-color: #434343;
	}

	h1 {
		margin: 0.625rem 2.125rem 1rem 2.125rem;
		font-family: var(--font);
		font-size: var(--title-size);
		letter-spacing: var(--letter-spacing);
		color: var(--title-color);
	}
</style>

<h1><slot /></h1>
