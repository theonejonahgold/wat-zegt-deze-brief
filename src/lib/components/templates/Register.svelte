<script>
	import { goto } from '$app/navigation'
	import { Back, Help, SpokenText } from '$atoms'
	import { client } from '$config/supabase'
	import { Form } from '$organisms'
	import Header from './Header.svelte'

	export let role: 'user' | 'volunteer'
	export let from

	const emailValidator: RegExp = /^\w+([\.\-+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
</script>

<style lang="scss">
	h2 {
		margin-bottom: var(--space-s);
	}
</style>

<Header>
	<Back slot="left" href="/onboarding/{role}/{from ? from : ''}" />
	<SpokenText --align="center" slot="middle" text="Registreren" />
	<Help slot="right" />
</Header>
<main>
	<Form
		action="/api/auth"
		on:success={async e => {
			await client.auth.setSession(e.detail.data.session.refresh_token)
			goto('/dashboard')
		}}
		fields={[
			{
				label: 'E-mailadres',
				name: 'email',
				type: 'email',
				autofocus: true,
				placeholder: 'voorbeeld@wat-zegt-deze-brief.nl',
				required: true,
				validator: value => {
					if (!value.length) return
					return !emailValidator.test(value) && 'Vul alsjeblieft een geldig e-mailadres in.'
				},
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
				placeholder: 'Jan Jansen',
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
