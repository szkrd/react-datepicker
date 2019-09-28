import getShortDayNames from './getShortDayNames'
import * as moment from 'moment'

describe('getShortDayNames', () => {
  test('get short days from moment', () => {
    expect(getShortDayNames()).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'])
    const loc = moment.locale()
    moment.locale('hu')
    expect(getShortDayNames()).toEqual(['h', 'k', 'sze', 'cs', 'p', 'szo', 'v'])
    moment.locale(loc)
  })
})
