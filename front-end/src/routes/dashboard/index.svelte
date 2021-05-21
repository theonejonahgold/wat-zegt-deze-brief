<script>
	import { Help, SpokenText } from '$atoms'
	import { ImageButton } from '$molecules'
	import { VolunteerIcon, UserIcon } from '$icons'
</script>

<style lang="scss">
	header {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		margin: 0;

		> :global {
			:first-child {
				justify-self: start;
			}

			:nth-child(2):not(:last-child),
			:nth-last-child(2):first-child {
				grid-column: 2;
				justify-self: center;
			}

			:last-child {
				justify-self: end;
			}
		}
	}
</style>

<svelte:head>
	<title>Role</title>
</svelte:head>

<header>
	<SpokenText text="Home" />
	<Help />
</header>

<main>
	<ImageButton href="/dashboard/letter" text="Foto maken van je brief">
		<UserIcon />
	</ImageButton>
	<ImageButton href="/dashboard/explanation" text="Uitleg"><VolunteerIcon /></ImageButton>
</main>
