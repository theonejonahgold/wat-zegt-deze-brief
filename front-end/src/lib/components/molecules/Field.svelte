<script>
	import Input from '$atoms/Input.svelte'

	export let placeholder: string
	export let type: string = 'text'
</script>

<label>
	<slot />
	<Input on:change {placeholder} {type} />
</label>
