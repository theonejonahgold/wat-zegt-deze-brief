<script>
	export let placeholder: string
	export let type: string = 'text'
</script>

<input on:change {placeholder} {type} />
