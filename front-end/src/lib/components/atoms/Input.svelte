<script>
	import { createEventDispatcher } from 'svelte'

	type inputTypes = 'text' | 'email' | 'number' | 'tel' | 'range'
	type inputEvent = Event & { currentTarget: EventTarget & HTMLInputElement }

	export let value = ''
	export let type: inputTypes = 'text'
	export let name = ''

	const dispatch =
		createEventDispatcher<{
			valueChange: {
				name: string
				value: string
			}
		}>()

	const inputHandler = (e: inputEvent) => {
		dispatch('valueChange', {
			name,
			value: e.currentTarget.value,
		})
	}
</script>

<input on:input={inputHandler} {value} {name} {type} {...$$restProps} />
