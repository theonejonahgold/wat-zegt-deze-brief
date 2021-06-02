<script>
	import { Field } from '$molecules'
	import type { FormField } from '$types'
	import { formEnhancer } from '$actions'
	import { Button, Input } from '$atoms'
	import { createEventDispatcher } from 'svelte'

	export let action: string
	export let method: 'GET' | 'POST' = 'POST'
	export let fields: FormField[] = []
	export let noEnhance = false

	const dispatch =
		createEventDispatcher<{
			success: { data: any; form: HTMLFormElement }
			loading: { data: FormData; form: HTMLFormElement }
			error: { error: Error; form: HTMLFormElement }
		}>()
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
		<Button bottom><slot name="submit">Verzenden</slot></Button>
	</form>
{:else}
	<form
		use:formEnhancer={{
			success: (data, form) => dispatch('success', { data, form }),
			loading: (data, form) => dispatch('loading', { data, form }),
			error: (error, form) => dispatch('error', { error, form }),
		}}
		{method}
		{action}
	>
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
		<Button bottom><slot name="submit">Verzenden</slot></Button>
	</form>
{/if}
