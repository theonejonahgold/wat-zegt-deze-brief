<script>
	import { Field } from '$molecules'
	import type { FormField } from '$types'
	import { formEnhancer } from '$actions'
	import { Button, Input } from '$atoms'
	import { createEventDispatcher } from 'svelte'
	import { addToast, dismissToast } from '$stores'

	export let action: string
	export let method: 'GET' | 'POST' = 'POST'
	export let fields: FormField[] = []
	export let noEnhance = false
	export let buttonPosition: 'sticky' | 'absolute' | false = 'absolute'

	const dispatch = createEventDispatcher<{
		success: { data: any; form: HTMLFormElement }
		loading: { data: FormData; form: HTMLFormElement }
		error: { error: Error; form: HTMLFormElement }
	}>()

	const handleValidation = (validation: string | false) => {
		if (!validation) return
		addToast({
			message: validation,
			type: 'error',
		})
	}

	const handleError = (error: Error) => {
		addToast({
			message: error.message,
			type: 'error',
		})
	}

	const handleSuccess = () => {
		dismissToast(null, true)
	}
</script>

<style lang="scss">
	form :global {
		label + label {
			margin-top: var(--space-s);
		}
	}
</style>

{#if noEnhance}
	<form {method} {action}>
		{#each fields as { initialValue, ...field } (field.name)}
			{#if field.type === 'hidden'}
				<Input {...field} value={initialValue} />
			{:else}
				<Field {...field} {initialValue}>
					{field.label}
				</Field>
			{/if}
		{/each}
		<slot />
		<Button bottom={buttonPosition}><slot name="submit">Verzenden</slot></Button>
	</form>
{:else}
	<form
		use:formEnhancer={{
			success: (data, form) => {
				dispatch('success', { data, form })
				handleSuccess()
			},
			loading: (data, form) => dispatch('loading', { data, form }),
			error: (error, form) => {
				dispatch('error', { error, form })
				handleError(error)
			},
		}}
		{method}
		{action}
	>
		{#each fields as { initialValue, ...field } (field.name)}
			{#if field.type === 'hidden'}
				<Input {...field} value={initialValue} />
			{:else}
				<Field
					on:blur={e => field.validator && handleValidation(field.validator(e.target.value))}
					{...field}
					{initialValue}
				>
					{field.label}
				</Field>
			{/if}
		{/each}
		<slot />
		<Button bottom={buttonPosition}><slot name="submit">Verzenden</slot></Button>
	</form>
{/if}
