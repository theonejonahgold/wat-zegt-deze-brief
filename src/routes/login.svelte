<script>
	import { Help, SpokenText } from '$atoms'
	import { Form } from '$organisms'
	import { Header } from '$templates'
</script>

<Header>
	<SpokenText slot="middle" --align="center" text="Inloggen" />
	<Help slot="right" />
</Header>
<main>
	<Form
		noEnhance
		method="POST"
		action="/api/auth"
		fields={[
			{
				name: 'email',
				label: 'E-mailadres',
				type: 'email',
				required: true,
				placeholder: 'voorbeeld@wat-zegt-deze-brief.nl',
			},
			{
				name: 'password',
				label: 'Wachtwoord',
				type: 'password',
				required: true,
				placeholder: '**************',
			},
			{
				type: 'hidden',
				initialValue: 'login',
				name: 'auth-type',
			},
		]}
	>
		<svelte:fragment slot="submit">Inloggen</svelte:fragment>
	</Form>
</main>
