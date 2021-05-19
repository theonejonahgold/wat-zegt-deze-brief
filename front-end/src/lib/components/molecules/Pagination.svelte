<script>
	export let selected: number
	export let amount: number
	export let items: Array<any>

	const steps = Array(items ? items.length : amount)
</script>

<div>
	{#each steps as _, i}
		<span class={i === selected ? 'active' : ''} />
	{/each}
</div>
