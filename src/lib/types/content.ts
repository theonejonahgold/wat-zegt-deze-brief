export interface InstructionsContent {
	text: string
	image: string
}

export interface InstructionsHrefs {
	previous: string
	next: { path: string; text: string }
	finish: { path: string; text: string }[]
}
