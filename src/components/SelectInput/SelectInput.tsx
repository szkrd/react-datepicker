import * as React from 'react'
import classnames from 'classnames'
import './selectInput.scss'
import Icon from '../Icon/Icon'

export interface ISelectOption {
  value: string | number
  text: string
}

// TODO add support for numbers, but not for any data type?
export interface ISelectInputProps {
  id?: string // htmlFor id
  placeholder?: string // default first item, value is '' (as in empty string)
  isInvalid?: boolean // adds the --error class
  disabled?: boolean
  isLoading?: boolean
  small?: boolean
  selectedValue?: string | number
  onChange?: (selectedValue: string) => void // callback, returns the string (!) value from the DOM
  options: ISelectOption[]
  label?: string
  className?: string
}

export default function SelectInput(props: ISelectInputProps) {
  let {
    options,
    disabled,
    selectedValue,
    label,
    placeholder,
    id,
    isInvalid,
    isLoading,
    small
  } = props
  let key = 0

  const placeholderItem = {
    key: -1,
    value: '',
    text: placeholder
  }
  const prepend = placeholder ? [placeholderItem] : []

  const optionTags = [...prepend, ...options]
    .map((item) => ({
      key: key++,
      value: item.value,
      text: item.text
    }))
    .map((item) => (
      <option key={item.key} value={item.value}>
        {item.text}
      </option>
    ))

  const extraClass = props.className ? ` ${props.className}` : ''
  const className =
    classnames({
      'select-input': true,
      'select-input--is-invalid': !!isInvalid,
      'select-input--is-loading': !!isLoading,
      'select-input--small': small,
      'select-input--is-filled': selectedValue !== ''
    }) + extraClass

  const selectInputArrowIconClassName = classnames({
    'select-input__toggle-icon': true,
    'select-input__toggle-icon--small': !label && !!small,
    'select-input__toggle-icon--labeled': !!label,
    'select-input__toggle-icon--labeled-small': !!label && !!small,
    'select-input__toggle-icon--is-filled': selectedValue !== ''
  })

  let onChange = () => { /**/ }
  if (typeof props.onChange === 'function') {
    // @ts-ignore
    onChange = (e: any) => props.onChange(e.target.value) // TODO fix event type
  }

  return (
    <div className={className}>
      {label && (
        <label className="select-input__title" htmlFor={id}>
          {label}
        </label>
      )}
      <select disabled={disabled} onChange={onChange} value={selectedValue} id={id}>
        {optionTags}
      </select>
      <div className={selectInputArrowIconClassName}>
        <Icon id={'chevron-down--grey'} size="s" />
        <b className="select-input__spinner" />
      </div>
    </div>
  )
}
