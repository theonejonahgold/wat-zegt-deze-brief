type NormalFieldType = 'text' | 'password' | 'email' | 'number' | 'radio' | 'file'

interface BasicFormField {
	name: string
	initialValue?: string
	required?: boolean
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
	list?: string
	validator?: (value: string) => string | false
}

interface HiddenFormField extends BasicFormField {
	type: 'hidden'
	initialValue: string
}

export type FormField = NormalFormField | HiddenFormField

export type InputType = NormalFieldType | 'hidden'
