<script>
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
		noEnhance
		action="/auth/register"
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
				label: 'Je voornaam (mag je leeg laten)',
				name: 'name',
				type: 'text',
			},
			{
				name: 'role',
				type: 'hidden',
				initialValue: role,
			},
			{
				name: 'auth-type',
				type: 'hidden',
				initialValue: 'register',
			},
		]}
		method="POST"
	>
		<svelte:fragment slot="submit">Registreren</svelte:fragment>
	</Form>
</main>
