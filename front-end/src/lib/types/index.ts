export * from './content'
export * from './form'

export interface Letter {
	id: string
	read: boolean
	sender?: string
	resolved: boolean
	src: string
	alt: string
	createdAt: number
	explainer?: {
		id: string
		name?: string
	}
	chat: LetterChat
}

interface LetterChat {
	id: string
	participants: string[]
	messages: ChatMessage[]
}

interface ChatMessage {
	id: string
	sender: {
		id: string
		name?: string
	}
	content: string
	type: 'audio' | 'text'
	date: number
}
