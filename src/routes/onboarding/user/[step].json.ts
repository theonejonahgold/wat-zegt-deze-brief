import type { RequestHandler } from '@sveltejs/kit'
import type { InstructionsContent } from '$types'

const userContent: InstructionsContent[] = [
	{
		text: 'Je maakt een foto van je brief',
		image: '/images/onboarding-user-1.png',
	},
	{
		text: 'Een vrijwilliger van de app leest je brief',
		image: '/images/onboarding-user-2.png',
	},
	{
		text: 'De vrijwilliger vertelt via een spraakmemo wat er in je brief staat',
		image: '/images/onboarding-user-3.png',
	},
	{
		text: 'De vrijwilligers zijn Nederlands, maar het zou kunnen dat iemand meerdere talen spreekt',
		image: '/images/onboarding-user-4.png',
	},
	{
		text: 'Wil je de talen die je spreek invullen?',
		image: '/images/onboarding-user-5.png',
	},
]

// @ts-expect-error: Typing of RequestHandler is incorrect
export const get: RequestHandler = ({ params: { step } }) => {
	const content = userContent[+step - 1]
	if (!content) return { status: 404, body: `Content for step ${step} not found.` }
	return { body: { content, amount: userContent.length } }
}
