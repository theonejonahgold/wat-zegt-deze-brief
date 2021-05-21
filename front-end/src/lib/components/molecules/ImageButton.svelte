<script>
	import { Icon, Image, Input, SpokenText } from '$atoms'

	export let src: string
	export let alt: string
	export let value: string
	export let name: string
	export let href: string = ''
	export let id: string
  export let text = ''
</script>

<style>
	:global(input[type='radio']) {
		margin: 0;
		padding: 0;
		appearance: none;
	}

	:global(input[type='radio']:checked + label) {
		box-shadow: 0 0 0 3px #9593fc;
	}

	:global(label) {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		box-shadow: 0px 3px 4px #cecece;
		height: 10rem;
		width: 17.375rem;
		border-radius: 10px;
	}
</style>

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
