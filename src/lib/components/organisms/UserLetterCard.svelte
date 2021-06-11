<script>
	import { Image } from '$atoms'
	import { formatTimestamp } from '$utils'
	import type { Letter } from '$types'

	export let letter: Letter

	const href =
		letter.volunteer !== null ? `/dashboard/chat/${letter.id}` : `/dashboard/letter/${letter.id}`

	const time = letter.messages?.length ? letter.messages[0].date : letter.createdAt
</script>

<style lang="scss">
	article {
		position: relative;

		&.unread:after {
			content: '';
			position: absolute;
			top: calc(-0.6667 * var(--space-xs));
			right: calc(-0.6667 * var(--space-xs));
			width: var(--space-s);
			height: var(--space-s);
			background: var(--dark);
			border-radius: 50%;
		}
	}

	a {
		text-decoration: none;
		color: var(--primary);
		display: grid;
		grid-template-columns: 2fr 3fr;
		padding: var(--space-s);
		gap: var(--space-xs);
		background-color: var(--secondary);
		box-shadow: var(--bs-button);
		border-radius: 10px;
		height: 10rem;

		:global(img) {
			object-fit: cover;
			object-position: top;
			min-height: 0;
			height: 100%;
			grid-column: 1;
			border-radius: 5px;
			width: 100%;
		}

		div {
			width: 100%;
			display: grid;
			grid-template-rows: min-content auto;
			gap: var(--space-xs);

			> header {
				display: grid;
				grid-template-rows: 1fr;
				grid-template-columns: auto max-content;
				column-gap: var(--space-xs);
			}

			> p {
				align-self: center;
			}
		}

		header {
			p,
			time {
				font-size: var(--font-xs);
			}
		}

		time {
			display: block;
			text-align: right;
			font-size: var(--font-xs);
			color: var(--subtext);
			grid-column: 2;
		}
	}
</style>

<article>
	<a {href}>
		<Image src={letter.image} />
		<div>
			<header>
				{#if letter.sender}
					<p>Brief van {letter.sender}</p>
				{:else}
					<p>
						Brief van {formatTimestamp(letter.createdAt)}
					</p>
				{/if}
				<time datetime={new Date(time).toLocaleDateString('nl-NL')}>
					{formatTimestamp(time)}
				</time>
			</header>
			{#if !letter.messages}
				<p>Je hebt nog geen uitleg ontvangen.</p>
			{:else}
				<p>Je hebt uitleg ontvangen</p>
			{/if}
		</div>
	</a>
</article>
