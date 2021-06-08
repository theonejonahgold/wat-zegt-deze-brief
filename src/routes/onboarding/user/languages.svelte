<script>
	import { Button, SpokenText, Back, Help } from '$atoms'
	import { LanguagePicker } from '$organisms'
	import { Flex, Header } from '$templates'
	import languages from './_languages'
</script>

<svelte:head>
	<title>Kies je talen</title>
</svelte:head>

<Header sticky>
	<Back slot="left" href="/onboarding/user?step=5" />
	<SpokenText --align="center" slot="middle" text="Kies je talen" />
	<Help slot="right" />
</Header>
<Flex>
	<LanguagePicker {languages} />
	<Button bottom="sticky" href="/onboarding/user/register?from=languages"
		>Opslaan, naar registreren</Button
	>
</Flex>
