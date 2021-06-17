<script>
	import { goto } from '$app/navigation'

	import { Back, Help, SpokenText } from '$atoms'
	import { client } from '$config/supabase'
	import { Form } from '$organisms'
	import { Header } from '$templates'

	const emailValidator: RegExp = /^\w+([\.\-+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
</script>

<svelte:head>
	<title>Inloggen</title>
</svelte:head>

<Header>
	<Back href="/" slot="left" />
	<SpokenText slot="middle" --align="center" text="Inloggen" />
	<Help slot="right" />
</Header>
<main>
	<Form
		method="POST"
		action="/api/auth"
		on:success={async e => {
			await client.auth.setSession(e.detail.data.session.refresh_token)
			goto('/dashboard')
		}}
		fields={[
			{
				name: 'email',
				label: 'E-mailadres',
				type: 'email',
				required: true,
				placeholder: 'voorbeeld@wat-zegt-deze-brief.nl',
				validator: value => {
					if (!value.length) return
					return !emailValidator.test(value) && 'Vul alsjeblieft een geldig e-mailadres in.'
				},
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
