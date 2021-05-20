<script>
	import { Title, Icon, Button, SpokenText, Main } from '$atoms'
	import { IndexIcon, Oval } from '$icons'

	let content = [
		{ text: 'Hallo!' },
		{ text: 'Dit is de app die helpt met het uitleggen van brieven' },
		{ text: 'Start' },
	]

	// let audioFile: HTMLAudioElement
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Oval />
<Main>
	<Title>{content[0].text}</Title>
	<!-- <SpokenText {audioFile}>{content[1].text}</SpokenText> -->
	<Icon><IndexIcon /></Icon>
	<a href="userRole"><Button>{content[2].text}</Button></a>
</Main>
