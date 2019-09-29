import React, { useState } from 'react'
import styles from './App.module.scss'
import DatePicker from './components/DatePicker/DatePicker'
import moment, { Moment } from 'moment'
import Link from './components/Link/Link'
import Loader from './components/Loader/Loader'
import Button from './components/Button/Button'

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment())
  const onChange = (date: Moment) => {
    setSelectedDate(date)
    console.info('date set to ', date.format('l'))
  }
  return (
    <div className={styles.app}>
      <div>
        <DatePicker onChange={onChange} selectedDate={selectedDate}/>
      </div>
      <hr className={styles.hr} />
      <p>
        Links: <Link text="accumsan neque" to="/foo" />,{' '}
        <Link text="vitae maximus" to="/bar" />
      </p>
      <hr className={styles.hr} />
      <div>
        Loader: <Loader />
      </div>
      <hr className={styles.hr} />
      <div className={styles.panel}>
        <Button text="primary" color="primary" /> &nbsp;
        <Button text="primary" color="primary" loading /> &nbsp;
        <Button text="secondary" color="secondary" /> &nbsp;
        <Button text="secondary disabled" color="secondary" disabled /> &nbsp;
        <Button text="success" color="success" /> &nbsp;
        <Button text="warning" color="warning" /> &nbsp;
        <Button text="danger" color="danger" /> &nbsp;
        <Button text="danger disabled" color="danger" disabled />
      </div>
      <div className={styles.panel}>
        <Button text="small" size="s" /> &nbsp;
        <Button text="loading" size="s" loading /> &nbsp;
        <Button text="disabled" size="s" disabled /> &nbsp;
        <Button text="back" size="s" color="warning" /> &nbsp;
        <Button text="ok" size="s" color="primary" /> &nbsp;
        <Button text="delete" size="s" color="danger" /> &nbsp;
      </div>
    </div>
  )
}

export default App
