import { Moment } from 'moment'
import moment from 'moment'
import range from '../array/range'

const DEFAULT_RANGE = 5

const castYear = (val: Moment | number | null) =>
  typeof val === 'number' ? moment().year(val) : val

const getYearRange = (
  centralDate: Moment | number | null = null,
  minDate: Moment | number | null = null,
  maxDate: Moment | number | null = null
): number[] => {
  // convert numbers to moment (but not nulls or existing Moment objects)
  let central = castYear(centralDate)
  let min = castYear(minDate)
  let max = castYear(maxDate)

  central = central ? central.clone() : moment()
  min = min ? min.clone() : central.clone().subtract(DEFAULT_RANGE, 'years')
  max = max ? max.clone() : central.clone().add(DEFAULT_RANGE, 'years')

  if (!centralDate) {
    return range(min.year(), max.year() + 1)
  }

  const diffDown = min.year() - central.year()
  const diffUp = max.year() - central.year()
  return range(central.year() + diffDown, central.year() + diffUp + 1)
}

export default getYearRange
