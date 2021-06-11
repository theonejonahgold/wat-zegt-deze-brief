<script>
	import { Image } from '$atoms'
	import { formatTimestamp } from '$utils'
	import type { Letter } from '$types'
	import { client } from '$config/supabase'

	export let letter: Letter

	const href: string =
		letter.volunteer?.id === client.auth.session().user.id
			? `/dashboard/chat/${letter.id}`
			: `/dashboard/letter/${letter.id}`
</script>

<style lang="scss">
	article {
		position: relative;
	}

	a {
		text-decoration: none;
		color: var(--primary);
		display: grid;
		grid-template-columns: 2fr 3fr;
		padding: var(--space-s);
		gap: var(--space-xs);
		background-color: var(--secondary);
		box-shadow: 0px 3px 4px var(--muted);
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

			> p {
				align-self: center;
			}
		}

		time {
			font-size: var(--font-s);
			color: var(--light);
		}
	}
</style>

<article>
	<a {href}>
		<Image src={letter.image} />
		<div>
			<p>Brief van {letter.sender ? letter.sender : 'onbekende instantie'}</p>
			<time datetime={new Date(letter.createdAt).toLocaleDateString('nl-NL')}>
				{formatTimestamp(letter.createdAt)}
			</time>
			<p>Start met uitleggen</p>
		</div>
	</a>
</article>
