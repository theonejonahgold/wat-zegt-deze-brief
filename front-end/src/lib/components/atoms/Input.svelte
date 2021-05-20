<script>
	import type { InputType } from '$types'

	export let value = ''
	export let type: InputType = 'text'
	export let name = ''
</script>

<style>
	input {
		border: 0;
		font-size: var(--font-m);
		border-radius: var(--border-radius);
		border: 1px solid var(--light);
		padding: var(--space-s);
	}
</style>

<input {value} {name} {type} {...$$restProps} />
