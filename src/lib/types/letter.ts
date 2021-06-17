export interface Letter {
	id: string
	image: string
	sender?: string
	createdAt: string
	user: {
		id: string
		name?: string
		languages?: string[]
	}
	volunteer?: {
		id: string
		name?: string
	}
	messages: ChatMessage[]
	page_order: string[]
	status: 'draft' | 'published' | 'resolved'
	deadline?: string
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
	read: boolean
}

export interface AudioMessage extends Message {
	type: 'audio'
	file: Blob
}

export interface TextMessage extends Message {
	type: 'text'
	file: never
}

export type ChatMessage = AudioMessage | TextMessage
