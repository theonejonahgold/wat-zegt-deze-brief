import { browser } from '$app/env'

export const textToSpeech = (text: string, handleStop: () => void) => {
	if (!browser) return

	const utterance = new SpeechSynthesisUtterance(text)

	utterance.addEventListener('error', handleStop)
	utterance.addEventListener('pause', handleStop)
	utterance.addEventListener('end', handleStop)

	const getVoices = () =>
		new Promise(resolve => {
			const voices = setInterval(() => {
				if (speechSynthesis.getVoices().length) {
					resolve(speechSynthesis.getVoices())
					clearInterval(voices)
				}
			}, 10)
		})

	getVoices().then((voices: SpeechSynthesisVoice[]) => {
		const xander = voices.filter(voice => voice.name === 'Xander')
		utterance.lang = 'nl-NL'
		if (xander.length) {
			utterance.voice = xander[0]
			utterance.rate = 0.7
		}
		speechSynthesis.speak(utterance)
	})
}
