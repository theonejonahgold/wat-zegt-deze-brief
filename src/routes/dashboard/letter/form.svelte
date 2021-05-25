<script>
	import { Form } from '$organisms'
</script>

<main>
	<h2>Stuur brief in</h2>
	<Form
		noEnhance
		action="/api/letter"
		fields={[
			{
				label: 'Foto brief',
				name: 'page',
				type: 'file',
				autofocus: true,
				placeholder: 'Nuon',
				required: true,
			},
		]}
		method="POST"
	>
		<svelte:fragment slot="submit">Stuur foto</svelte:fragment>
	</Form>
</main>
