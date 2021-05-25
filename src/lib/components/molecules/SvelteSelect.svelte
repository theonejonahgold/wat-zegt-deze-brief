<script>
	import Select from 'svelte-select'

	interface Language {
		code: string
		name: string
		nativeName: string
	}

	const languages: Language[] = [
		{ code: 'nl', name: 'Nederlands', nativeName: 'Nederlands' },
		{ code: 'ar', name: 'Arabisch', nativeName: 'العربية' },
		{ code: 'fr', name: 'Frans', nativeName: 'français' },
	]

	const items = languages.map(lang => ({ value: lang.code, label: lang.name }))

	let selected

	function handleSelect(event) {
		selected = event.detail
		console.log(selected)
	}
</script>

<style>
	:global(input) {
		margin: 0;
	}
</style>

<h1>Svelte Select Example</h1>

<h2>Multi</h2>
<Select {items} isMulti={true} on:select={handleSelect} />

{#if selected}
	<p>Selected languages are:</p>
	{#each selected as lang}
		<p>{lang.label}</p>
	{/each}
{/if}
