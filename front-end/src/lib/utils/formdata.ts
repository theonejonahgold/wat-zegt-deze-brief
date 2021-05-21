export { convertFormDataToJson }

function convertFormDataToJson(data: FormData) {
	return JSON.stringify(Object.fromEntries(data.entries()))
}
