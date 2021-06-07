import { browser } from '$app/env'
import { textToSpeech as tts } from '$utils'

export const textToSpeech = (node: HTMLElement, text?: string) => {
	if (!browser) return
	let textContent = text || node.textContent
	const content = document.querySelector('template').content.cloneNode(true) as HTMLElement
	const button = content.querySelector('button')
	button.addEventListener('click', handlePlayback, false)
	node.appendChild(content)

	function handlePlayback(e) {
		e.preventDefault()
		button.querySelector('#Group').classList.add('playing')
		tts(textContent, () => {
			button.querySelector('#Group').classList.remove('playing')
		})
	}

	return {
		destroy() {
			button.removeEventListener('click', handlePlayback, false)
		},
		update(text?: string) {
			textContent = text || node.textContent
		},
	}
}
