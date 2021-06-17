<script>
	import type { InputType } from '$types'

	export let value = ''
	export let type: InputType = 'text'
	export let name = ''
</script>

<style>
	input {
		border: 0;
		font-size: var(--font-s);
		border-radius: var(--border-radius);
		box-shadow: var(--bs-m-down);
		padding: var(--space-m);
	}
</style>

<input on:change on:blur {value} {name} {type} {...$$restProps} />
