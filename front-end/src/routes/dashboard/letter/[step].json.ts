import type { RequestHandler } from '@sveltejs/kit'
import type { InstructionsContent } from '$types'

const letterContent: InstructionsContent[] = [
	{
		text: 'Pak de envelop en haal de brief eruit',
		image: '/images/letter-1.png',
	},
	{
		text: 'Maak van elke pagina een foto',
		image: '/images/letter-2.png',
	},
	{
		text: 'Probeer je persoonlijke gegevens niet te laten zien',
		image: '/images/letter-3.png',
	},
	{
		text: 'Je krijgt een melding als je uitleg hebt gekregen over je brief',
		image: '/images/letter-4.png',
	},
]

// @ts-expect-error: Typing of RequestHandler is incorrect
export const get: RequestHandler = ({ params: { step } }) => {
	const content = letterContent[+step - 1]
	if (!content) return { status: 404, body: `Content for step ${step} not found.` }
	return { body: { content, amount: letterContent.length } }
}
