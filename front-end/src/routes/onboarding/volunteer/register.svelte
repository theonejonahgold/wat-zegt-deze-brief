<script>
	import { Form } from '$organisms'
</script>

<h1>Registreren</h1>
<Form
	action="{import.meta.env.VITE_API_URL}/user/register"
	on:success={e => console.log(e.detail)}
	fields={[
		{
			label: 'E-mailadres',
			name: 'email',
			type: 'email',
			autofocus: true,
			placeholder: 'voorbeeld@wat-zegt-deze-brief.nl',
		},
		{
			label: 'Wachtwoord',
			name: 'password',
			type: 'password',
			placeholder: '**********',
		},
		{
			name: 'role',
			type: 'hidden',
			initialValue: 'volunteer',
		},
	]}
	method="POST"
>
	<svelte:fragment slot="submit">Registreren</svelte:fragment>
</Form>
