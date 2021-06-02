<script>
	import { Input } from '$atoms'
	import type { InputType } from '$types'

	export let initialValue = ''
	export let type: InputType = 'text'
	export let name = ''
	export let id = name
</script>

<style>
	label {
		display: block;
		color: var(--muted);

		:global(input) {
			display: block;
			margin-top: var(--space-xxs);
			width: 100%;
		}
	}
</style>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label for={id}>
	<slot />
	<Input on:change value={initialValue} {name} {type} {...$$restProps} />
</label>
