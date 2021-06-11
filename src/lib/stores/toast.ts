import { writable } from 'svelte/store'
import type { Toast, ToastProps } from '$types'

export const toasts = writable<Toast[]>([])

export const addToast = ({
	message,
	type = 'info',
	dismissible = true,
	duration = 4000,
}: ToastProps) => {
	const id = Math.floor(Math.random() * 10000)

	toasts.update(val => [{ id, message, type, dismissible, duration }, ...val])

	duration && setTimeout(() => dismissToast(id), duration)
}

export const dismissToast = id => {
	toasts.update(val => val.filter(toast => toast.id !== id))
}
