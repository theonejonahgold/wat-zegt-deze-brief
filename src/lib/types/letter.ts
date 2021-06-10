export interface Letter {
	id: string
	image: string
	sender?: string
	createdAt: string
	volunteer?: {
		name: string
	}
	messages: ChatMessage[]
	page_order: string[]
}

interface Message {
	id: string
	sender: {
		id: string
		name?: string
	}
	content: string
	type: 'audio' | 'text'
	date: string
}

export interface AudioMessage extends Message {
	type: 'audio'
	file: string
}

export interface TextMessage extends Message {
	type: 'text'
	file: never
}

export type ChatMessage = AudioMessage | TextMessage
