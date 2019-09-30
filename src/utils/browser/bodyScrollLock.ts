
// modals (app.tsx render) fire unlocking erratically,
// so we define lock groups here
const locks: { [key: string]: boolean } = {}
let hasClass = false

const lastScrollPosition = {
  x: 0,
  y: 0
}

// let's stay on the safe side and ALWAYS define your groups
export type BodyScrollLockGroupNames = 'modal' | 'another-component'

// I'm not goint to lock event handlers, because it's not reliable:
// on iOS in landscape mode safari's bottom bar appears,
// and without scrolling (lock event handlers true) that
// can not be hidden at all.
// (in portrait mode the fixed position's bottom right
// coordinates are above the bottom bar, but in landscape
// mode it's 0 0 and is behind the bottom bar)
const bodyScrollLock = (
  state: boolean,
  groupName: BodyScrollLockGroupNames
) => {
  const htmlEl = document.getElementsByTagName('HTML')[0]
  const getLockCount = () => Object.keys(locks).map((key) => locks[key]).filter(val => val).length
  const currentLockCount = getLockCount()

  locks[groupName] = state
  if (state && !currentLockCount) {
    hasClass = true
    lastScrollPosition.x = window.scrollX
    lastScrollPosition.y = window.scrollY
    htmlEl.classList.add('scroll-lock')
    return
  }

  if (!state && !getLockCount() && hasClass) {
    hasClass = false
    htmlEl.classList.remove('scroll-lock')
    window.scrollTo(lastScrollPosition.x, lastScrollPosition.y)
  }
}

export default bodyScrollLock
