import moment from 'moment'

// for example: "H, K, Sze, Cs, P, Szo, V"
// (with some added trickery, thanks to US, Canada and Japan,
// where the first day is sunday)
const getShortDayNames = () => {
  const localeData = moment.localeData()
  const days = localeData.weekdaysMin()
  const firstDayOfWeek = localeData.firstDayOfWeek()
  const end = days.slice(0, firstDayOfWeek)
  return [...days.slice(firstDayOfWeek), ...end]
}

export default getShortDayNames
