<script>
	import { Icon, Image, SpokenText } from '$atoms'

	export let src = ''
	export let alt = ''
	export let href = ''
	export let text = ''
</script>

<style lang="scss">
	div {
		width: 100%;

		a {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--secondary);
			box-shadow: var(--bs-button);
			height: 10rem;
			padding: var(--space-l);
			width: 100%;
			border-radius: 10px;

			+ :global(p) {
				text-align: center;
				margin-top: var(--space-xs);
				font-size: var(--font-s);
				font-weight: normal;
			}
		}
	}
</style>

<div>
	<a {href}>
		{#if src}
			<Image {src} {alt} />
		{:else}
			<Icon>
				<slot aria-label={alt} />
			</Icon>
		{/if}
	</a>
	<SpokenText {text} />
</div>
