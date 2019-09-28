import getYearRange from './getYearRange'
import moment from 'moment'

describe('getYearRange', () => {
  test('get range of years either from numbers of from moment objects', () => {
    // given date +-5 years
    expect(getYearRange(2015)).toEqual([
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020
    ])

    // center, min, max all set
    expect(getYearRange(2020, 2018, 2023)).toEqual([2018, 2019, 2020, 2021, 2022, 2023])

    const center = moment('1999-01-01')
    const min = moment('1997-01-01')
    const max = moment('2001-01-01')
    expect(getYearRange(center, min, max)).toEqual([1997, 1998, 1999, 2000, 2001])

    // center and min
    expect(getYearRange(center, min)).toEqual([1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004])

    // center and max
    expect(getYearRange(center, null, max)).toEqual([
      1994,
      1995,
      1996,
      1997,
      1998,
      1999,
      2000,
      2001
    ])

    // center not specified, min and max defines the range
    expect(getYearRange(null, min, max)).toEqual([1997, 1998, 1999, 2000, 2001])

    // finally let's check whether we cloned everything
    expect(center.format('YYYY-MM-DD')).toBe('1999-01-01')
    expect(min.format('YYYY-MM-DD')).toBe('1997-01-01')
    expect(max.format('YYYY-MM-DD')).toBe('2001-01-01')
  })
})
