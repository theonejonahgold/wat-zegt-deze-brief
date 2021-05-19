import type { RequestHandler } from '@sveltejs/kit'
import type { OnboardingContent } from '$types'

const volunteerContent: OnboardingContent[] = [
	{
		text: 'Helaas zijn er veel mensen die niet begrijpen wat er in hun brief staat.',
		audio: null,
		image: null,
	},
	{
		text: 'Zoek een brief die jij wilt uitleggen. Let hierbij vooral op de datum, hoelang wacht een persoon al op uitleg?',
		audio: null,
		image: null,
	},
	{
		text: 'Lees de brief door en leg vervolgens via een spraakmemo uit waar deze over gaat. Geef aan of er wel of geen actie nodig is en benoem dit.',
		audio: null,
		image: null,
	},
	{
		text: 'De persoon van wie de brief is krijgt jouw uitleg te zien en te horen en kan hierna nog vragen aan je stellen.',
		audio: null,
		image: null,
	},
]

// @ts-expect-error: Typing of RequestHandler is incorrect
export const get: RequestHandler = ({ params: { step } }) => {
	const content = volunteerContent[+step - 1]
	if (!content) return { status: 404, body: `Content for step ${step} not found.` }
	return { body: { content, amount: volunteerContent.length } }
}
