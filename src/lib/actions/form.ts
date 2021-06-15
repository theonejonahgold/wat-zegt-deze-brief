import type { JSONValue } from '@sveltejs/kit/types/endpoint'

interface FormEnhancerParams<T> {
	loading?: (data: FormData, form: HTMLFormElement) => void
	error?: (error: Error, form: HTMLFormElement) => void
	success: (data: T, form: HTMLFormElement) => void
}

export function formEnhancer<ResBody extends Record<string, JSONValue>>(
	form: HTMLFormElement,
	{ success, error, loading }: FormEnhancerParams<ResBody>
) {
	form.addEventListener('submit', submitHandler)

	function submitHandler(e: Event) {
		e.preventDefault()

		const body = new FormData(form)

		if ((<any>e).submitter?.name) body.set((<any>e).submitter.name, (<any>e).submitter.value)

		loading?.(body, form)

		fetch(form.action, {
			method: form.method,
			body,
			headers: {
				Accept: 'application/json',
			},
			credentials: 'include',
		})
			.then(res => {
				if (!res.ok)
					return res.text().then(err => {
						throw new Error(err)
					})
				return res.status === 204
					? success(null, form)
					: res.json().then(data => success(data, form))
			})
			.catch(err => {
				if (!error) throw err
				error(err, form)
			})
	}

	return {
		destroy() {
			form.removeEventListener('submit', submitHandler)
		},
	}
}
