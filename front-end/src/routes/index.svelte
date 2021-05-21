<script>
	import { Title, Icon, Button, SpokenText, Main } from '$atoms'
	import { IndexIcon, Oval } from '$icons'

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Oval />
<Main>
	<Title>Hallo!</Title>
  <SpokenText text="Dit is de app die helpt met het uitleggen van brieven" />
	<Icon><IndexIcon /></Icon>
  <Button href="/userRole">Start</Button>
</Main>
