<script>
	import type { InputType } from '$types'

	export let value = ''
	export let type: InputType = 'text'
	export let name = ''
</script>

<input {value} {name} {type} {...$$restProps} />
