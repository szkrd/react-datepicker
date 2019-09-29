// import * as React from 'react';
import './button.scss';
// import Loader from '../Loader/Loader';
// import Link from '../Link/Link';

interface IButtonProps {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  text: string;
  onClick?: (event?: any) => any;
  disabled?: boolean;
  to?: string;
  loading?: boolean;
  block?: boolean;
  className?: string;
  size?: 's' | 'm' | 'l';
}

export default function Button(props: IButtonProps) {
  return null;
  /*
  const { onClick, disabled, to, loading, size, block, text, className } = props;
  const text = props.text;

  let color = props.color || ButtonColor.Orange;
  if (isGhost) {
    color = ButtonColor.Ghost;
  }
  const clickHandler = (event: any) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };
  const keyDownHandler = (event) => {
    if (!disabled && onClick && event.key === 'Enter') {
      onClick();
    }
  };

  const buttonColor = color || ButtonColor.Orange;

  const classes: string = classnames({
    button: true,
    [className]: !!className,
    [`button--size-${size}`]: typeof size === 'string',
    'button--loading': loading,
    'button--inline': inline,
    'button--disabled': disabled,
    'button--orange': buttonColor === ButtonColor.Orange,
    'button--sunflower': buttonColor === ButtonColor.Sunflower,
    'button--grey-stroke': buttonColor === ButtonColor.GreyStroke,
    'button--ghost': buttonColor === ButtonColor.Ghost
  });

  const spanClasses: string = classnames({
    disabled: disabled
  });

  if (to) {
    return (
      <Link className={classes} to={to} onClick={clickHandler}>
        <span className={spanClasses}>{text}</span>
      </Link>
    );
  } else {
    return (
      <div className={classes} onClick={clickHandler} onKeyDown={keyDownHandler} tabIndex={0}>
        {loading && <Loader className="button__loader" />}
        {!loading && <span className={spanClasses}>{text}</span>}
      </div>
    );
  }
  */
}
