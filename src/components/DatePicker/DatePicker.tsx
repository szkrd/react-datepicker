import * as React from 'react'
import { useState } from 'react'
import { Moment } from 'moment'
import DatePickerDialog from './DatePickerDialog'
import Icon from '../Icon/Icon'
import styles from './datePicker.module.scss'
import moment from 'moment'

interface IProps {
  onChange: (selectedDate: Moment) => void
  selectedDate: Moment
  minDate?: Moment
  maxDate?: Moment
}

export default function DatePicker(props: IProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const { selectedDate, minDate, maxDate, onChange } = props

  const handleToggle = () => {
    setShowDatePicker(!showDatePicker)
  }

  const handleSelect = (selectedDate: Moment) => {
    onChange(selectedDate)
    setShowDatePicker(false)
  }

  const viewportDate = selectedDate || moment()

  return (
    <div className={styles.root}>
      <span onClick={handleToggle} className={styles.clickable}>
        <span className={styles.selectedDate}>
          {selectedDate ? selectedDate.format('L') : '\u00a0'}
        </span>
        <Icon id="calendar--grey" size="s" />
      </span>
      {showDatePicker && (
        <DatePickerDialog
          viewportDate={viewportDate}
          selectedDate={selectedDate}
          onChange={handleSelect}
          onClose={handleToggle}
          minDate={minDate}
          maxDate={maxDate}
          className={styles.dialog}
        />
      )}
    </div>
  )
}
