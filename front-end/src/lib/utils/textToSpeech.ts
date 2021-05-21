import { browser } from '$app/env'

export const textToSpeech = (text: string, handleStop: () => void) => {
	if (!browser) return
	const utterance = new SpeechSynthesisUtterance(text)

	utterance.addEventListener('error', handleStop)
	utterance.addEventListener('pause', handleStop)
	utterance.addEventListener('end', handleStop)

	utterance.lang = 'nl-NL'
	speechSynthesis.speak(utterance)
}
