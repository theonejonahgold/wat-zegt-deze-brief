<script>
	import IconButton from './IconButton.svelte'
	import { RecordIcon, StopRecordingIcon } from '$icons'

	export let recording = false
</script>

<IconButton on:click>
	{#if recording}
		<StopRecordingIcon />
	{:else}
		<RecordIcon />
	{/if}
</IconButton>
