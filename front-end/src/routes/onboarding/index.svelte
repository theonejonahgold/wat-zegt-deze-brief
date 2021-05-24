<script>
	import { Back, Help, SpokenText } from '$atoms'
	import { ImageButton } from '$molecules'
	import { VolunteerIcon, UserIcon } from '$icons'
</script>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		margin: 0;
	}
</style>

<svelte:head>
	<title>Role</title>
</svelte:head>

<header>
	<Back href="/" />
	<SpokenText text="Waar kom je voor?" />
	<Help />
</header>

<main>
	<ImageButton alt="A user" text="Ik heb hulp nodig met een brief" href="/onboarding/user">
		<VolunteerIcon />
	</ImageButton>
	<ImageButton alt="A volunteer" text="Hulp geven" href="/onboarding/volunteer">
		<UserIcon />
	</ImageButton>
</main>
