<script>
	import { Button, SpokenText, Back, Help } from '$atoms'
	import { LanguagePicker } from '$organisms'
	import { Header } from '$templates'
</script>

<Header>
	<Back slot="left" href="/onboarding/user?step=5" />
	<SpokenText --align="center" slot="middle" text="Talen" />
	<Help slot="right" />
</Header>
<LanguagePicker />
<Button href="/onboarding/user/register">Verder</Button>
