/**
 * wraps the given function in to a guard that stops event default action
 * @param functionToWrap
 */
export default function preventDefault(functionToWrap?: Function) {
  return (event: any) => {
    event.preventDefault()
    return functionToWrap ? functionToWrap(event) : null
  }
}
