<script>
	import { API_URL } from '$config/env'
	import { Form } from '$organisms'

	export let role: 'user' | 'volunteer'
</script>

<style lang="scss">
	h2 {
		margin-bottom: var(--space-m);
	}
</style>

<main>
	<h2>Registreren</h2>
	<Form
		action="{API_URL}/{role}/register"
		on:success={e => console.log(e.detail)}
		fields={[
			{
				label: 'E-mailadres',
				name: 'email',
				type: 'email',
				autofocus: true,
				placeholder: 'voorbeeld@wat-zegt-deze-brief.nl',
				required: true,
			},
			{
				label: 'Wachtwoord',
				name: 'password',
				type: 'password',
				placeholder: '**********',
				required: true,
			},
			{
				label: 'Naam (hoeft niet)',
				name: 'name',
				type: 'text',
			},
			{
				name: 'role',
				type: 'hidden',
				initialValue: role,
			},
		]}
		method="POST"
	>
		<svelte:fragment slot="submit">Registreren</svelte:fragment>
	</Form>
</main>
