import React, { useState } from 'react';
import styles from './App.module.scss';
import DatePicker from './components/DatePicker/DatePicker';
import moment, { Moment } from 'moment';
import Link from './components/Link/Link';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import ButtonTabSwitcher from './components/ButtonTabSwitcher/ButtonTabSwitcher';
import DatePickerDialog from './components/DatePicker/DatePickerDialog';
import Icon from './components/Icon/Icon'
import Modal from './components/Modal/Modal'

const forceStyle = (className = '') => `${className} ${styles.override}`;

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [showModal, setShowModal] = useState<boolean>(false)
  const onChange = (date: Moment) => {
    setSelectedDate(date);
    console.info('date set to ', date.format('l'));
  };
  const today = moment();
  const minDate = moment().subtract(5, 'years');
  const maxDate = moment();
  return (
    <div className={styles.app}>
      <div className={styles.panelCenteredContent}>
        <DatePicker onChange={onChange} selectedDate={selectedDate} />
      </div>
      <div className={styles.panel}>
        <DatePickerDialog
          className={forceStyle(styles.datePickerDialogExample)}
          viewportDate={today}
          selectedDate={selectedDate}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
      <hr className={styles.hr} />
      <p>
        Links: <Link text="accumsan neque" to="/foo" />, <Link text="vitae maximus" to="/bar" />
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
      <hr className={styles.hr} />
      <div className={styles.panel}>
        <ButtonTabSwitcher leftText="Left item" rightText="Right item" />
      </div>
      <div className={styles.panel}>
        <Icon id="logout--black" size="s" />
        <Icon id="logout--black" size="m" />
        <Icon id="logout--black" size="l" />
      </div>
      <div className={styles.panel}>
        <Button text="show modal" onClick={() => setShowModal(true)}/>
        {showModal && (
          <Modal
            title="This is a modal"
            exit={() => setShowModal(false)}
            loading={false}
            boxModelBorderBox
          >
            <p>
              Simple text content
            </p>
            <footer className="padded">
              <Button className="pull-left" text="close" color="secondary"/>
              <Button className="pull-right" text="delete" color="danger"/>
            </footer>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default App;
