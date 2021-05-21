import { convertFormDataToJson } from '$utils'

interface FormEnhancerParams {
	loading?: (data: FormData, form: HTMLFormElement) => void
	error?: (error: Error, form: HTMLFormElement) => void
	success: (data: any, form: HTMLFormElement) => void
}

export function formEnhancer(
	form: HTMLFormElement,
	{ success, error, loading }: FormEnhancerParams
) {
	form.addEventListener('submit', submitHandler)

	function submitHandler(e: Event) {
		e.preventDefault()

		const formData = new FormData(form)

		loading?.(formData, form)

		const jsonData = convertFormDataToJson(formData)

		fetch(form.action, {
			method: form.method,
			body: jsonData,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			mode: 'cors',
		})
			.then(res => {
				if (!res.ok)
					return res.text().then(err => {
						throw new Error(err)
					})
				return res.json().then(data => success(data, form))
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
