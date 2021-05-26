<script>
	import type { InputType } from '$types'
	import { getContext, setContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	export let value = ''
	export let type: InputType = 'text'
	export let name = ''

	const pageStore = getContext<Writable<string | ArrayBuffer>>('previews')

	const onFileSelected = e => {
		let image = e.target.files[0]
		let reader = new FileReader()
		reader.readAsDataURL(image)
		reader.onload = e => {
			let page = e.target.result
			pageStore.set(page)
		}
	}
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

{#if type === 'file'}
	<input on:change={e => onFileSelected(e)} {value} {name} {type} {...$$restProps} />
{:else}
	<input {value} {name} {type} {...$$restProps} />
{/if}
