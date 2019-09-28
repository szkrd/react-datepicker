import { useEffect } from 'react'

export default function useClickOutside(elementSelector: string, onClickOutside: () => void) {
  const bodyClickHandler = (event: any) => { // TODO fix event type
    if (!event.target.closest(elementSelector)) {
      onClickOutside()
    }
  }

  useEffect(() => {
    document.addEventListener('click', bodyClickHandler)
    return () => document.removeEventListener('click', bodyClickHandler)
  })
}
