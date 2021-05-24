export * from './content'
export * from './form'

export interface Letter {
	id: number
	time: number
	explained: boolean
	src: string
	alt: string
	name?: string
}
