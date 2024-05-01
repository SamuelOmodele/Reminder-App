import React, { useState } from 'react'
import './reminderForm.css'
import { v4 as uuidv4 } from 'uuid';
import Form from './Form';

const ReminderForm = ({reminderList, setReminderList, currentDateTimeString}) => {

    // -- state variables for the reminder form 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [longTime, setLongTime] = useState(null); // -- longTime contains the time with other information
    const [time, setTime] = useState(); // -- time contains only the time information gotten from the longTime
    const [validationMsg, setValidationMsg] = useState(''); 



    // -- function to set reminder when the form is submitted
    const setReminder = (event) => {
        event.preventDefault();

        const currentTimeString = currentDateTimeString()[0];
        const currentDateString = currentDateTimeString()[1];

        // -- input validation (endure non-empty fields and reminder due time is not in the past ) --
        if (title === '' || description === '' || date === '' || time === '' || longTime === null){
            setValidationMsg('All Input fields must be filled!');
        }else if (currentDateString > date || (currentDateString === date && currentTimeString > time)){
            setValidationMsg('Cannot set reminder to a past date');
        } else {
            setValidationMsg('');
            const id = uuidv4();
            const reminderData = {id, title, description, date, time, longTime}
            const updatedReminderList = [...reminderList, reminderData];

            // -- set reminderList and local storage to the updated reminder list 
            setReminderList(updatedReminderList);
            localStorage.setItem('ReminderList', JSON.stringify(updatedReminderList));

            // -- clear input fields
            setTitle('');
            setDescription('');
            setDate('');
            setTime('');
            setLongTime(null);

        }
    }

    return (
        <form action="#" onSubmit={setReminder} autoComplete='off'>
            <Form btn_text={'set_reminder'} validationMsg={validationMsg} title={title} setTitle={setTitle} description={description} setDescription={setDescription} date={date} setDate={setDate} longTime={longTime} setLongTime={setLongTime} setTime={setTime}/>
            <div className="reminder-status">
                You have <span className='purple-color'>{reminderList.length} reminder(s)</span>
            </div>
        </form>
    )
    
}

export default ReminderForm
