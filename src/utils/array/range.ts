// similar to lodash range
export default function range(
  startOrEnd: number = 0,
  endOptional?: number,
  stepOptional?: number
): number[] {
  let start = startOrEnd
  let end = endOptional || 0 // or zero is for ts only
  let step = stepOptional || 1
  if (arguments.length === 1) {
    end = startOrEnd
    start = 0
    if (end < 0 && !endOptional) {
      step = -1
    }
  }
  let returnArray = []
  let stepMul = start > end ? -1 : 1
  for (let i = start; i < end * stepMul; i += step * stepMul) {
    returnArray.push(i ? i * stepMul : i)
  }
  return returnArray
}
