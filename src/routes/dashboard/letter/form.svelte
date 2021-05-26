<script>
	import { Form } from '$organisms'
	import { ImagePreview } from '$molecules'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	const pageStore = writable('')
	setContext('previews', pageStore)
</script>

<main>
	<h2>Stuur brief in</h2>
	<Form
		noEnhance
		action="/api/letter"
		fields={[
			{
				label: 'Organisatie',
				name: 'organisation',
				type: 'text',
				autofocus: true,
				required: true,
			},
			{
				label: 'Foto brief',
				name: 'page',
				type: 'file',
				autofocus: true,
				required: true,
			},
		]}
		method="POST"
	>
		<svelte:fragment slot="submit">Stuur foto</svelte:fragment>
	</Form>
	{#if $pageStore}
		<ImagePreview src={$pageStore} alt="Page preview" />
	{/if}
</main>
