<script>
	import { Back, Help, SpokenText } from '$atoms'
	import { ImageButton } from '$molecules'
	import { VolunteerIcon, UserIcon } from '$icons'
	import { Flex, Header } from '$templates'
</script>

<svelte:head>
	<title>Role</title>
</svelte:head>

<Header>
	<Back slot="left" href="/" />
	<SpokenText slot="middle" --align="center" text="Waar kom je voor?" />
	<Help
		slot="right"
		text="In dit scherm is de vraag, heb je hulp nodig met een brief, of wil je hulp geven? Als je hulp nodig hebt met een brief, klik je op de mevrouw met een brief in haar hand. Als je hulp wilt geven klik je op de man met de telefoon."
	/>
</Header>

<Flex --justify="space-evenly">
	<ImageButton alt="A user" text="Ik heb hulp nodig met een brief" href="/onboarding/user">
		<UserIcon />
	</ImageButton>
	<ImageButton alt="A volunteer" text="Hulp geven" href="/onboarding/volunteer">
		<VolunteerIcon />
	</ImageButton>
</Flex>
