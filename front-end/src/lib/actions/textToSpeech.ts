import { browser } from '$app/env'

export const textToSpeech = (node: HTMLElement, text?: string) => {
	if (!browser) return
	let textContent = text || node.textContent
	const content = document.querySelector('template').content.cloneNode(true) as HTMLElement
	const button = content.querySelector('button')
	const image = content.querySelector('img')
	image.src = ''
	button.addEventListener('click', handlePlayback)
	node.appendChild(content)

	// TODO: Add events

	const utterance = new SpeechSynthesisUtterance(textContent)
	utterance.lang = 'nl-NL'

	function handlePlayback() {
		speechSynthesis.speak(utterance)
		image.src = ''
	}

	return {
		destroy() {
			button.removeEventListener('click', handlePlayback)
		},
		update(text) {
			utterance.text = text
		},
	}
}
