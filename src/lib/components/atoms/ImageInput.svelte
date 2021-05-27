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
		width: 10rem;
		height: 10rem;
		border: 2px dashed var(--dark);
		display: grid;
		place-content: center;
		place-items: center;
		border-radius: var(--border-radius);
		position: relative;

		> :global(*) {
			grid-column: 1;
			grid-row: 1;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: var(--border-radius);
		}

		input {
			visibility: hidden;
			width: 100%;
		}

		span {
			position: absolute;
			bottom: -2em;
		}

		&:after {
			content: '+';
			grid-row: 1;
			grid-column: 1;
			font-size: var(--font-l);
			color: var(--dark);
			width: var(--space-xl);
			height: var(--space-xl);
			line-height: var(--space-xl);
			border-radius: 50%;
			border: 1px dashed var(--dark);
			font-weight: 400;
			text-align: center;
		}

		&.loading {
			&:after {
				content: '';
				animation: rotate 2s linear infinite;
			}

			@keyframes rotate {
				from {
					transform: rotate(0turn);
				}
				to {
					transform: rotate(1turn);
				}
			}
		}

		&.selected {
			border-style: solid;

			&:after {
				content: unset;
			}
		}
	}
</style>

<label class:selected={selectedImage} class:loading>
	<slot />
	<input {name} on:change={changeHandler} type="file" />
	{#if selectedImage}
		<img src={selectedImage} alt="" aria-hidden="true" />
	{/if}
	<span>{selectedImage ? 'Foto wijzigen' : 'Foto kiezen'}</span>
</label>
