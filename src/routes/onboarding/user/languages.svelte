<script>
	import { Back, Button, Help, SpokenText } from '$atoms'
	import { LanguagePicker } from '$organisms'
	import { Flex, Header } from '$templates'
	import languages from './_languages'
</script>

<svelte:head>
	<title>Kies max. 3 talen</title>
</svelte:head>

<Header sticky>
	<Back slot="left" href="/onboarding/user?step=5" />
	<SpokenText --align="center" slot="middle" text="Kies max. 3 talen" />
	<Help slot="right" />
</Header>
<Flex>
	<LanguagePicker {languages} />
	<Button bottom="sticky" href="/onboarding/user/register?from=languages"
		>Opslaan, naar registreren</Button
	>
</Flex>
