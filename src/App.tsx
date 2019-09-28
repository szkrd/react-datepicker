import React, { useState } from 'react'
import './App.css'
import DatePicker from './components/DatePicker/DatePicker'
import moment, { Moment } from 'moment'

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment())
  const onChange = (date: Moment) => {
    setSelectedDate(date)
    console.info('date set to ', date.format('l'))
  }
  return (
    <div className="App">
      <DatePicker onChange={onChange} selectedDate={selectedDate}/>
    </div>
  )
}

export default App
