export interface Letter {
	id: string
	image: string
	sender?: string
	resolved: boolean
	createdAt: string
	volunteer?: {
		name: string
	}
	messages: ChatMessage[]
}

interface ChatMessage {
	id: string
	sender: {
		name?: string
	}
	content: string
	type: 'audio' | 'text'
	date: string
}
