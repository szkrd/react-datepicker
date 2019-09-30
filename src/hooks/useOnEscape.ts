import { useEffect } from 'react'

export default function useOnEscape(callback: Function) {
  const eventHandler = (event: any) => {
    if (event.key === 'Escape') {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', eventHandler)
    return () => {
      document.removeEventListener('keydown', eventHandler)
    }
  })
}
