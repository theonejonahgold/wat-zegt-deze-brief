<script>
	import { Icon, Image } from '$atoms'
	import { textToSpeech } from '$actions'

	export let src = ''
	export let alt = ''
	export let href = ''
	export let text = ''
</script>

<style lang="scss">
	a {
		display: grid;
		grid-template-rows: 8rem 2rem;
		background-color: var(--secondary);
		box-shadow: var(--bs-button);
		padding: var(--space-s);
		gap: var(--space-s);
		width: 100%;
		border-radius: 10px;
		color: var(--primary);

		> :global(div) {
			grid-row: 1 / span 1;
			height: auto;
			width: auto;
		}
	}

	span {
		display: block;
		text-align: center;
		font-size: var(--font-s);
		font-weight: normal;
	}
</style>

<a {href}>
	{#if src}
		<Image {src} {alt} />
	{:else}
		<Icon>
			<slot aria-label={alt} />
		</Icon>
	{/if}
	<span use:textToSpeech>
		{text}
	</span>
</a>
