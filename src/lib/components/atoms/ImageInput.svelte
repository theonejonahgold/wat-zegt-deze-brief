<script>
	export let name: string
	export let selectedImage: string

	let loading = false

	function changeHandler(e: Event & { currentTarget: HTMLInputElement }) {
		const image = e.currentTarget.files[0]
		const reader = new FileReader()
		reader.readAsDataURL(image)
		loading = true
		reader.addEventListener('load', e => {
			selectedImage = e.target.result as string
			loading = false
		})
	}
</script>

<style lang="scss">
	label {
		border-radius: 50%;
		width: var(--space-xl);
		height: var(--space-xl);
		background: var(--dark);
		display: grid;
		place-content: center;
		place-items: center;
		position: relative;
		overflow: hidden;

		> :global(*) {
			grid-column: 1;
			grid-row: 1;
		}

		input {
			visibility: hidden;
			width: 100%;
		}

		&:after {
			content: '+';
			grid-row: 1;
			grid-column: 1;
			font-size: var(--font-l);
			color: var(--secondary);
			width: var(--space-xl);
			height: var(--space-xl);
			line-height: var(--space-xl);
			font-weight: 400;
			text-align: center;
		}
	}
</style>

<label>
	<input {name} accept="image/jpeg, image/png" on:change type="file" />
</label>
