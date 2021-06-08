export interface Toast {
	id: number
	message: string
	type: 'error' | 'info' | 'success'
	dismissible: boolean
	duration: number
}

export type ToastProps = Omit<Toast, 'id'>
