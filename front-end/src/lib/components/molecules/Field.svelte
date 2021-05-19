<script>
	import { Input } from '$atoms'

	type inputTypes = 'text' | 'email' | 'number' | 'tel' | 'range'

	export let value = ''
	export let type: inputTypes = 'text'
	export let name = ''
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	<slot />
	<Input on:valueChange {value} {name} {type} {...$$restProps} />
</label>
