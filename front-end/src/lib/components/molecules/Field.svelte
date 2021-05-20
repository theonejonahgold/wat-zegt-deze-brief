<script>
	import { Input } from '$atoms'
	import type { InputType } from '$types'

	export let initialValue = ''
	export let type: InputType = 'text'
	export let name = ''
	export let id = name
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label for={id}>
	<slot />
	<Input value={initialValue} {name} {type} {...$$restProps} />
</label>
