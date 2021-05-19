<script>
	import { Title, Icon, Button, SpokenText, Section } from '$atoms'
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
<Section>
	<Title>{content[0].text}</Title>
	<!-- <SpokenText {audioFile}>{content[1].text}</SpokenText> -->
	<Icon><IndexIcon /></Icon>
	<Button>{content[2].text}</Button>
</Section>
