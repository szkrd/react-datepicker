import * as React from 'react';
import './SelectInput.scss';
import Icon from '../Icon/Icon';

export interface ISelectOption {
  value: string | number;
  text: string;
}

// TODO add support for numbers, but not for any data type?
export interface ISelectInputProps {
  id?: string; // htmlFor id
  placeholder?: string; // default first item, value is '' (as in empty string)
  isInvalid?: boolean; // adds the --error class
  disabled?: boolean;
  isLoading?: boolean;
  small?: boolean;
  selectedValue?: string | number;
  onChange?: (selectedValue: string) => void; // callback, returns the string (!) value from the DOM
  options: ISelectOption[];
  label?: string;
  className?: string;
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
  } = props;
  let key = 0;

  const placeholderItem = {
    key: -1,
    value: '',
    text: placeholder
  };
  const prepend = placeholder ? [placeholderItem] : [];

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
    ));

  const extraClass = props.className ? ` ${props.className}` : '';
  const isFilled = selectedValue !== '';
  const className = [
    'select-input',
    isInvalid ? 'select-input--is-invalid' : '',
    isLoading ? 'select-input--is-loading' : '',
    small ? 'select-input--small' : '',
    isFilled ? 'select-input--is-filled' : '',
    extraClass
  ].join(' ');
  const selectInputArrowIconClassName = [
    'select-input__toggle-icon',
    !label && !!small ? 'select-input__toggle-icon--small' : '',
    label ? 'select-input__toggle-icon--labeled' : '',
    label && small ? 'select-input__toggle-icon--labeled-small' : '',
    isFilled ? 'select-input__toggle-icon--is-filled' : ''
  ].join(' ');

  let onChange = () => {
    /**/
  };
  if (typeof props.onChange === 'function') {
    // @ts-ignore
    onChange = (e: any) => props.onChange(e.target.value); // TODO fix event type
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
  );
}
