import * as React from 'react';
import './Loader.scss';

export interface ILoaderProps {
  className?: string;
  // center in the full browser viewport
  viewportCenter?: boolean;
  // add dark coverlayer behind the Loader?
  withCover?: boolean;
  // force roundness (even for the cover, not just the spinner)
  roundCover?: boolean;
}

export default function Loader(props: ILoaderProps) {
  const { withCover, roundCover, viewportCenter } = props;
  const className = [
    props.className,
    'loader-component',
    roundCover ? 'loader-component--round' : '',
    viewportCenter ? 'loader-component--viewport-center' : '',
    withCover ? 'loader-component--with-cover' : ''
  ].join(' ');
  const ringClassName = [
    'loader-component__ring',
    withCover ? 'loader-component__ring--centered' : ''
  ].join(' ');
  return (
    <div className={className}>
      <div className={ringClassName} />
    </div>
  );
}
