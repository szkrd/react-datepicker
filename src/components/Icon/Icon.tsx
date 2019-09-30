import React, { CSSProperties } from 'react'
import './Icon.scss'

export type IconIds =
  | 'calendar--grey'
  | 'chevron-left--grey'
  | 'chevron-right--grey'
  | 'chevron-down--grey'
  | 'logout--black'
  | 'times--darkgrey'

interface IIconProps {
  id?: IconIds
  // override the component's class, not really recommended though
  className?: string
  // by default it is contain - if you have a slight padding around the svg, you can use 150% for example
  imageSize?: string
  // 18 - 32 -46, medium is default - or specify a number in pixels
  size?: 's' | 'm' | 'l' | 'contain' | number
}

export default function Icon(props: IIconProps) {
  let { id, size, imageSize } = props
  const classNames = ['icon', `icon--${id}`]
  const style: CSSProperties = {}
  size = size || 'm'

  if (typeof size === 'number') {
    style.width = style.height = size
  } else if (typeof size === 'string') {
    classNames.push(`icon--size-${size}`)
  }

  if (imageSize) {
    style.backgroundSize = imageSize
  }

  if (props.className) {
    classNames.push(props.className)
  }

  return <b className={classNames.join(' ')} style={style} />
}
