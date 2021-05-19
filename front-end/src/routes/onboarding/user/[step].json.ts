import type { RequestHandler } from '@sveltejs/kit'
import type { OnboardingContent } from '$types'

const userContent: OnboardingContent[] = [
	{
		text: 'Je maakt een foto van je brief',
		audio: null,
		image: null,
	},
	{
		text: 'Een vrijwilliger van de app leest je brief',
		audio: null,
		image: null,
	},
	{
		text: 'De vrijwilliger vertelt via een spraakmemo wat er in je brief staat',
		audio: null,
		image: null,
	},
	{
		text: 'De vrijwilligers zijn Nederlands, maar het zou kunenn dat iemand meerdere talen spreekt',
		audio: null,
		image: null,
	},
	{
		text: 'Wil je doorgeven wat jouw moedertaal is, zodat je hier misschien uitleg in kan krijgen?',
		audio: null,
		image: null,
	},
]

// @ts-expect-error: Typing of RequestHandler is incorrect
export const get: RequestHandler = ({ params: { step } }) => {
	const content = userContent[+step - 1]
	if (!content) return { status: 404, body: `Content for step ${step} not found.` }
	return { body: { content, amount: userContent.length } }
}
