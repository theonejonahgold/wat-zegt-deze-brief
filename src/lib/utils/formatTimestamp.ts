import { addMinutes, isYesterday, isToday, differenceInCalendarDays } from 'date-fns'

export const formatTimestamp = (timestamp: string) => {
	const timeInCurrentTimezone = addMinutes(new Date(timestamp), new Date().getTimezoneOffset() * -1)
	console.log(timeInCurrentTimezone)
	const currentDate = new Date()
	console.log(currentDate)
	const time = timeInCurrentTimezone.toLocaleTimeString('nl-NL').slice(0, -3)
	console.log(time)
	const day = timeInCurrentTimezone.toLocaleDateString('nl-NL', { weekday: 'long' })
	console.log(day)
	if (isToday(timeInCurrentTimezone)) return time
	if (isYesterday(timeInCurrentTimezone)) return 'gisteren'
	if (differenceInCalendarDays(timeInCurrentTimezone, currentDate) < 7) return day
	return timeInCurrentTimezone.toLocaleDateString('nl-NL').slice(0, -5)
}
