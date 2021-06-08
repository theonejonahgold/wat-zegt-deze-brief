<script>
	export let id: string
	export let options: string[]
</script>

<datalist {id}>
	{#each options as option}
		<option value={option} />
	{/each}
</datalist>
