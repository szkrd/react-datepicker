import React, { useState } from 'react';
import './ButtonTabSwitcher.scss';

interface IProps {
  leftText: string;
  middleText?: string;
  rightText: string;
  preselectedItem?: number;
  onChange?: (selectedItem: number) => void;
}

//
//  ╭--------------╮    ╭--------------╮
//  │   Left (0)   │ or │   Right (1)  │
//  ╰-----╲  ╱-----╯    ╰--------------╯
//         \/
//
export default function ButtonTabSwitcher(props: IProps) {
  const { leftText, rightText } = props;
  const preselectedItem = typeof props.preselectedItem === 'number' ? props.preselectedItem : -1;
  const [selectedItem, setSelectedItem] = useState<number>(preselectedItem);
  const middleText = props.middleText || 'or';
  const onChange = props.onChange || (() => null);
  const handleLeftClick = () => {
    setSelectedItem(0);
    onChange(0);
  };
  const handleRightClick = () => {
    setSelectedItem(1);
    onChange(1);
  };
  const leftSelectorClasses = [
    'button-tab-switcher-component__selector',
    selectedItem === 0 ? 'button-tab-switcher-component__selector--active' : ''
  ].join(' ');
  const rightSelectorClasses = [
    'button-tab-switcher-component__selector',
    selectedItem === 1 ? 'button-tab-switcher-component__selector--active' : ''
  ].join(' ');

  return (
    <ul className="button-tab-switcher-component">
      <div className={leftSelectorClasses} onClick={handleLeftClick}>
        {leftText}
        <div className="button-tab-switcher-component__triangle" />
      </div>
      <div className="button-tab-switcher-component__separator">{middleText}</div>
      <div className={rightSelectorClasses} onClick={handleRightClick}>
        {rightText}
        <div className="button-tab-switcher-component__triangle" />
      </div>
    </ul>
  );
}
