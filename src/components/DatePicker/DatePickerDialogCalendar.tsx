import * as React from 'react'
import moment, { Moment } from 'moment'
import classnames from 'classnames'
import getShortDayNames from '../../utils/date/getShortDayNames'
import getCalendarDays from '../../utils/date/getCalendarDays'
import './datePickerDialogCalendar.scss'

interface IProps {
  viewportDate: Moment
  onClick?: (selectedDate: Moment) => void
  selectedDate?: Moment
  minDate?: Moment
  maxDate?: Moment
}

// the inner table with the days and the day names
const DatePickerDialogCalendar = (props: IProps) => {
  const { viewportDate, selectedDate, maxDate, minDate } = props
  const today = moment()
  const dayNames = getShortDayNames()
  const days = getCalendarDays(viewportDate)
  const rows = []
  while (days.length) {
    rows.push(days.splice(0, 7))
  }
  const isMax = (day: Moment) => day !== null && maxDate && day.isAfter(maxDate, 'day')
  const isMin = (day: Moment) => day !== null && minDate && day.isBefore(minDate, 'day')
  const isMinOrMax = (day: Moment) => isMax(day) || isMin(day)

  const getBodyCellClass = (day: Moment) => {
    const empty = day === null
    return classnames({
      'simple-date-picker-calendar__body-cell': true,
      'simple-date-picker-calendar__body-cell--empty': empty,
      'simple-date-picker-calendar__body-cell--today': !empty && day.isSame(today, 'day'),
      'simple-date-picker-calendar__body-cell--selected':
        !empty && selectedDate && day.isSame(selectedDate, 'day'),
      'simple-date-picker-calendar__body-cell--not-allowed': isMinOrMax(day)
    })
  }

  const handleDayClick = (event: any) => {
    const dateStr = event.currentTarget.dataset.moment
    event.preventDefault()
    if (props.onClick) {
      props.onClick(moment(dateStr))
    }
  }

  return (
    <table className="simple-date-picker-calendar">
      <thead>
        <tr>
          {dayNames.map((name, i) => (
            <td key={i} className="simple-date-picker-calendar__head-cell">
              {name}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((momentDate, n) => (
              <td key={n} className={getBodyCellClass(momentDate)}>
                {momentDate && !isMinOrMax(momentDate) && (
                  <a
                    href="#"
                    className="simple-date-picker-calendar__day"
                    onClick={handleDayClick}
                    data-moment={momentDate.format()}
                  >
                    <span className="simple-date-picker-calendar__day-radius">
                      {momentDate.date()}
                    </span>
                  </a>
                )}
                {momentDate && isMinOrMax(momentDate) && (
                  <span className="simple-date-picker-calendar__day simple-date-picker-calendar__day--not-allowed">
                    <span className="simple-date-picker-calendar__day-radius">
                      {momentDate.date()}
                    </span>
                  </span>
                )}
                {!momentDate && <></>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DatePickerDialogCalendar
