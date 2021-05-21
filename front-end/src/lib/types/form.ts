type NormalFieldType = 'text' | 'password' | 'email' | 'number'

interface BasicFormField {
	name: string
	initialValue?: string
	type: InputType
}

interface NormalFormField extends BasicFormField {
	label: string
	type: NormalFieldType
	autofocus?: boolean
	id?: string
	placeholder?: string
	disabled?: boolean
	readonly?: boolean
}

interface HiddenFormField extends BasicFormField {
	type: 'hidden'
	initialValue: string
}

export type FormField = NormalFormField | HiddenFormField

export type InputType = NormalFieldType | 'hidden'
