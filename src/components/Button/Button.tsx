import * as React from 'react';
import './Button.scss';
import history from '../../utils/navigation/history'
import Loader from '../Loader/Loader';

type TOnClickEvent = React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | any;

interface IButtonProps {
  // color scheme, defaults to the generic secondary
  color?: 'secondary' | 'primary' | 'success' | 'warning' | 'danger';
  text: string;
  // onClick will be executed on click or enter press, may return explicit false
  onClick?: (event?: TOnClickEvent) => any;
  disabled?: boolean;
  // href to be passed to history.push it that's your fancy,
  // though you're better off using Link for the sake of accessibility
  to?: string;
  loading?: boolean;
  // style display, defaults to inline-block
  display?: 'inline-block' | 'block' | 'inline-flex' | 'flex';
  className?: string;
  // defaults medium, we have no large yet
  size?: 'm' | 's';
}

export default function Button(props: IButtonProps) {
  const { disabled, to, loading, text } = props;
  const display = props.display || 'inline-block';
  const color = props.color || 'secondary'
  const size = props.size || 'm'
  const className = [
    'button-component',
    `button-component--color-${color}`,
    `button-component--size-${size}`,
    loading ? 'button-component--loading' : '',
    disabled ? 'button-component--disabled' : '',
    props.className || ''
  ].join(' ');
  const style = { display }

  const onClick = (event: TOnClickEvent) => {
    if (disabled) {
      return;
    }
    if (typeof props.onClick === 'function') {
      const ret = props.onClick(event);
      if (ret === false) {
        event.stopPropagation();
        return;
      }
    }
    if (typeof to === 'string') {
      history.push(to);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClick(event);
    }
  };

  // probably we'd be better off with a button, dunno...
  // on the other hand form elements are always a bitch to style properly
  // (see: https://css-tricks.com/overriding-default-button-styles/)
    return (
      <div className={className} style={style} onClick={onClick} onKeyDown={onKeyDown} tabIndex={0}>
        {loading && <Loader className="button-component__loader" />}
        <span className="button-component__text">{text}</span>
      </div>
    );
}
