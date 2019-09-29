import React from 'react';
import history from '../../utils/navigation/history';
import './Link.scss'

interface ILinkProps {
  to: string;
  text: string;
  className?: string;
}

/**
 * Internal links, using browserHistory push
 */
export default function Link(props: ILinkProps) {
  const className = ['link-component', props.className || ''].join(' ');
  const { text, to } = props;
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    history.push(to);
  };
  return (
    <a className={className} href={to} onClick={onClick}>
      {text}
    </a>
  );
}
