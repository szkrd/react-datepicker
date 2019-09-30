import React, { CSSProperties, useEffect } from 'react';
import './Modal.scss';
import preventDefault from '../../utils/dom/preventDefault';
import useOnEscape from '../../hooks/useOnEscape';
import bodyScrollLock from '../../utils/browser/bodyScrollLock';
import Loader from '../Loader/Loader';
import Icon from '../Icon/Icon';

interface IProps {
  height?: 'auto' | 'fixed-minimum';
  noBodyScrollLock?: boolean;
  noEscapeKeyHandler?: boolean;
  loading?: boolean;
  boxModelBorderBox?: boolean; // newer pages have proper box model border-box
  overflowVisible?: boolean;
  title: string;
  className?: string;
  exit: () => void;
}

export default function Modal(props: React.PropsWithChildren<IProps>) {
  const {
    title,
    exit,
    children,
    height,
    className,
    loading,
    noEscapeKeyHandler,
    noBodyScrollLock
  } = props;
  const baseClasses = [
    'modal',
    `modal-${title.replace(/ /g, '_').toLowerCase()}`,
    className || ''
  ].join(' ');
  const containerClasses = 'modal__container';

  const contentStyle: CSSProperties = {};
  if (height === 'auto') {
    contentStyle.height = contentStyle.minHeight = 'auto';
  }

  useOnEscape(() => {
    if (!noEscapeKeyHandler && !loading) {
      exit();
    }
  });

  useEffect(() => {
    if (!noBodyScrollLock) {
      bodyScrollLock(true, 'modal');
      return () => bodyScrollLock(false, 'modal');
    }
  });

  return (
    <div className={baseClasses}>
      <div className={containerClasses}>
        <div className="modal__container__box">
          <div className="modal__container__box__content" style={contentStyle}>
            {loading && (
              <div className="modal__loading-cover">
                <Loader withCover />
              </div>
            )}
            <div className="modal__container__box__content__header">
              <div className="placeholder" />
              <div className="title">{title}</div>
              <a href="#" className="modal__exit" onClick={preventDefault(exit)}>
                <Icon id="times--darkgrey" size={30} />
              </a>
            </div>
            <div className="modal__container__box__content__content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
