<script>
	import { Icon, Image, Input, SpokenText } from '$atoms'

	export let src = ''
	export let alt = ''
	export let value = ''
	export let name = ''
	export let href = ''
	export let id = ''
	export let text = ''
</script>

<style lang="scss">
	div {
		width: 100%;

		:global {
			input[type='radio'] {
				margin: 0;
				padding: 0;
				appearance: none;
			}

			input[type='radio']:checked + label {
				box-shadow: 0 0 0 3px var(--dark);
			}
		}

		label,
		a {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--secondary);
			box-shadow: 0px 3px 4px var(--muted);
			height: 10rem;
			width: 100%;
			border-radius: 10px;

			+ :global(p) {
				text-align: center;
				margin-top: var(--space-s);
			}
		}
		a {
			text-decoration: none;
			flex-direction: column;
			color: var(--primary);
		}
	}
</style>

<div>
	{#if href}
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
	{:else}
		<Input {value} {name} {id} type="radio" />
		<label for={id}>
			{#if src}
				<Image {src} {alt} />
			{:else}
				<Icon>
					<slot aria-label={alt} />
				</Icon>
			{/if}
		</label>
		<SpokenText {text} />
	{/if}
</div>
