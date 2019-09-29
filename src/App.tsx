import React, { useState } from 'react'
import './App.css'
import DatePicker from './components/DatePicker/DatePicker'
import moment, { Moment } from 'moment'
// import Button from './components/Button/Button'
import Link from './components/Link/Link'
import Loader from './components/Loader/Loader'

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment())
  const onChange = (date: Moment) => {
    setSelectedDate(date)
    console.info('date set to ', date.format('l'))
  }
  return (
    <div className="App">
      <div>
        <DatePicker onChange={onChange} selectedDate={selectedDate}/>
      </div>
      <hr/>
      <p>
        Links: <Link text="accumsan neque" to="/foo" />,{' '}
        <Link text="vitae maximus" to="/bar" />
      </p>
      <hr/>
      <div>
        Loader: <Loader />
      </div>
    </div>
  )
}

export default App
