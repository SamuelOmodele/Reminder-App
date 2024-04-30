import React, { useEffect, useState } from 'react'
import Form from '../reminder_form/Form';

const EditForm = ({ reminder, setRemToBeEdited, reminderList, setReminderList, currentDateTimeString }) => {

  // -- state variables for the edit reminder form 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); 
  const [longTime, setLongTime] = useState(null); 
  const [validationMsg, setValidationMsg] = useState('');

  // -- set state variables to the reminder to be edited
  useEffect(() => {
    setTitle(reminder.title);
    setDescription(reminder.description);
    setDate(reminder.date);
    setTime(reminder.time);
    setLongTime(reminder.longTime);
  }, [])

  // -- Edit reminder in the reminder list
  const EditReminder = (event) => {
    event.preventDefault();

    // -- get current time and date
    const currentTimeString = currentDateTimeString()[0];
    const currentDateString = currentDateTimeString()[1];

    // -- input validation (endure non-empty fields and reminder due time is not in the past ) --
    if (title === '' || description === '' || date === '' || time === '') {
      setValidationMsg('All Input fields must be filled!');
    } else if (currentDateString > date || (currentDateString === date && currentTimeString > time)) {
      setValidationMsg('Cannot set reminder to a past date');
    } else {
      setValidationMsg('');
      const reminderId = reminder.id;
      const EditedReminderData = { reminderId, title, description, date, time, longTime };

      const updatedReminderList = reminderList.map(prevReminder =>
        prevReminder.id === reminderId ? EditedReminderData : prevReminder
      )

      // -- update reminder list and local storage
      setReminderList(updatedReminderList);
      localStorage.setItem('ReminderList', JSON.stringify(updatedReminderList));

      // -- close the edit form popup alert
      closeReminderAlert();

    }
  }

  // -- close reminder popup
  const closeReminderAlert = () => {
    setRemToBeEdited(null);
  }


  return (
    <>
      <div className="alert-bg"></div>
      <div className="alert edit">
        <form action="#" onSubmit={EditReminder} autoComplete='off'>
          <h2 className='edit-heading'>Edit Reminder</h2>
          <span className="material-symbols-outlined close" onClick={closeReminderAlert}>close</span>
          <Form btn_text={'edit_reminder'} validationMsg={validationMsg} title={title} setTitle={setTitle} description={description} setDescription={setDescription} date={date} setDate={setDate} longTime={longTime} setLongTime={setLongTime} setTime={setTime} />
        </form>
      </div>

    </>

  )
}

export default EditForm