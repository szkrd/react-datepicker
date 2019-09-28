import moment, { Moment } from 'moment'
import range from '../array/range'

// get a list of moment dates (the days) for the selected month
// (fragment weeks' days are to be filled with nulls)
const getCalendarDays = (selected: Moment): Moment[] => {
  const localeData = moment.localeData()
  const firstDayOfWeek = localeData.firstDayOfWeek()
  const monthStart = moment(selected).startOf('month')
  let prevOffset = firstDayOfWeek !== monthStart.day() ? monthStart.day() - firstDayOfWeek : 0
  prevOffset = prevOffset < 0 ? 7 + prevOffset : prevOffset
  const days = range(0, prevOffset).map(() => null) // days of the previous month
  range(0, selected.daysInMonth()).forEach((i) =>
    days.push(
      // @ts-ignore TODO fixme
      moment(selected)
        .startOf('month')
        .add(i, 'days')
    )
  )
  const remnant = days.length % 7
  if (remnant) {
    range(0, 7 - remnant).forEach(() => days.push(null))
  }
  // @ts-ignore TODO fixme
  return days
}

export default getCalendarDays
