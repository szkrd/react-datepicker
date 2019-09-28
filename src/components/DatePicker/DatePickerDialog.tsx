import * as React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import { Moment } from 'moment'
import './datePickerDialog.scss'
import SelectInput, { ISelectOption } from '../SelectInput/SelectInput'
import DatePickerDialogCalendar from './DatePickerDialogCalendar'
import getYearRange from '../../utils/date/getYearRange'
import { useState } from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import Icon from '../Icon/Icon'

interface ISimpleDatePickerProps {
  onChange: (value: Moment) => void
  onClose?: () => void
  selectedDate?: Moment
  viewportDate: Moment // it's up to you, to use a sensible value
  minDate?: Moment
  maxDate?: Moment // I'm real nice here, this defaults to today
  className?: string
}

export default function DatePickerDialog(props: ISimpleDatePickerProps) {
  // if you want to mess with any of the moment values, do not forget to clone or stringify/format them!
  const { selectedDate, onChange } = props
  const minDate = props.minDate ? props.minDate.clone() : moment('1970-01-01')
  const maxDate = props.maxDate ? props.maxDate.clone() : moment().endOf('day')

  // using state with primitive types (will also take care of uncloned moment instances)
  const [dropdownYear, setDropdownYear] = useState(props.viewportDate.year() + '')
  const [viewportDate, setViewportDate] = useState(
    props.viewportDate
      .clone()
      .startOf('month')
      .format()
  )

  const hasNextMonth = moment(viewportDate).isBefore(maxDate, 'month')
  const hasPrevMonth = moment(viewportDate).isAfter(minDate, 'month')
  const monthTitle = moment(viewportDate).format('MMMM')

  const prevMonthButtonClassName = classnames({
    'simple-date-picker__prev-month': true,
    'simple-date-picker__prev-month--disabled': !hasPrevMonth
  })
  const nextMonthButtonClassName = classnames({
    'simple-date-picker__next-month': true,
    'simple-date-picker__next-month--disabled': !hasNextMonth
  })
  const selectableYears: ISelectOption[] = getYearRange(null, minDate, maxDate).map((year) => ({
    text: year + '',
    value: year + ''
  }))

  const handleNextMonthClick = (event: any) => {
    event.preventDefault()
    if (hasNextMonth) {
      setViewportDate(
        moment(viewportDate)
          .add(1, 'month')
          .format()
      )
    }
  }

  const handlePrevMonthClick = (event: any) => {
    event.preventDefault()
    if (hasPrevMonth) {
      setViewportDate(
        moment(viewportDate)
          .subtract(1, 'month')
          .format()
      )
    }
  }

  const handleYearClick = (year: string) => {
    setDropdownYear(year)
    setViewportDate(
      moment(viewportDate)
        .year(+year)
        .format()
    )
  }

  const handleDayClick = (selection: Moment) => {
    onChange(selection)
  }

  const className = ['simple-date-picker', props.className || ''].join(' ').trim()
  const onClose = props.onClose || (() => { /**/ })
  useClickOutside('.simple-date-picker', onClose)

  return (
    <div className={className}>
      <a href="#" className={prevMonthButtonClassName} onClick={handlePrevMonthClick}>
        <Icon id="chevron-left--grey" size="s" />
      </a>
      <a href="#" className={nextMonthButtonClassName} onClick={handleNextMonthClick}>
        <Icon id="chevron-right--grey" size="s" />
      </a>
      <div className="simple-date-picker__current-month">{monthTitle}</div>
      <div className="simple-date-picker__year-selector">
        <SelectInput
          options={selectableYears}
          selectedValue={dropdownYear}
          onChange={handleYearClick}
          className="simple-date-picker__select-input"
        />
      </div>
      <DatePickerDialogCalendar
        onClick={handleDayClick}
        selectedDate={selectedDate}
        viewportDate={moment(viewportDate)}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  )
}
