import type { RequestHandler } from '@sveltejs/kit'
import type { OnboardingContent } from '$types'

const volunteerContent: OnboardingContent[] = [
	{
		text: 'Helaas zijn er veel mensen die niet begrijpen wat er in hun brief staat.',
		image: '/images/onboarding-volunteer-1.png',
	},
	{
		text: 'Zoek een brief die jij wilt uitleggen. Let hierbij vooral op de datum, hoelang wacht een persoon al op uitleg?',
		image: '/images/onboarding-volunteer-2.png',
	},
	{
		text: 'Lees de brief door en leg vervolgens via een spraakmemo uit waar deze over gaat. Geef aan of er wel of geen actie nodig is en benoem dit.',
		image: '/images/onboarding-volunteer-3.png',
	},
	{
		text: 'De persoon van wie de brief is krijgt jouw uitleg te zien en te horen en kan hierna nog vragen aan je stellen.',
		image: '/images/onboarding-volunteer-4.png',
	},
]

// @ts-expect-error: Typing of RequestHandler is incorrect
export const get: RequestHandler = ({ params: { step } }) => {
	const content = volunteerContent[+step - 1]
	if (!content) return { status: 404, body: `Content for step ${step} not found.` }
	return { body: { content, amount: volunteerContent.length } }
}
