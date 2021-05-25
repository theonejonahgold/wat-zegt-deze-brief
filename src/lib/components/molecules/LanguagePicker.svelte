<script>
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
</script>

<label>
	Kies een taal:
	<input list="languages" />
</label>

<datalist id="languages">
	{#each languages as language}
		<option value="{language.name} ({language.nativeName})" />
	{/each}
</datalist>
