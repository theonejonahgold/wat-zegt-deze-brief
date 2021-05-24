export const formatTimestamp = (timestamp: number) => {
	const current = new Date()
	const date = new Date(timestamp * 1000)
	const time = date.toLocaleTimeString('en-GB').slice(0, -3)
	const day = date.toLocaleDateString('en-GB', { weekday: 'long' })

	if (date.toDateString() === current.toDateString()) return time
	if (date.getDate() === current.getDate() - 1) return 'yesterday'
	if (current.getDate() - date.getDate() < 7) return day
	return date.toLocaleDateString().slice(0, -5)
}
