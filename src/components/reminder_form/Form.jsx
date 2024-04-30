import React, {useEffect } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = ({btn_text, validationMsg, title, setTitle, description, setDescription, date, setDate, longTime, setLongTime, setTime}) => {

    useEffect(() => {
        if (longTime instanceof Date){ // -- ensuring that the long time format has been set
            const hours = longTime.getHours().toString().padStart(2, '0');
            const minutes = longTime.getMinutes().toString().padStart(2, '0');
            const selectedTimeString = `${hours}:${minutes}`;
            setTime(selectedTimeString);
        }
    }, [longTime])

    return (
        <>
        
            {validationMsg !== '' && <div className="err-msg">{validationMsg}</div>}

            <div className="form-row row1">
                <div className="form-group size1">
                    <label htmlFor="title">Title</label>
                    <div className="word-length">{title.length}/12</div>
                    <input type="text" name="title" id="title" placeholder='Reminder title ...' value={title} onChange={(event) => setTitle(event.target.value)} maxLength={12} />
                </div>
                <div className="form-group size2">
                    <label htmlFor="description">Description</label>
                    <div className="word-length">{description.length}/32</div>
                    <input type="text" name="description" id="description" placeholder='Reminder description ...' value={description} onChange={(event) => setDescription(event.target.value)} maxLength={32} />
                </div>
            </div>

            <div className="form-row row2">
                <div className="form-group size1">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" id="date" placeholder='Date ...' value={date} onChange={(event) => setDate(event.target.value)} />
                </div>
                <div className="form-group size1">
                    <label htmlFor="time">Time</label>
                    <DatePicker placeholderText='Reminder time ...' className='time' id='time' selected={longTime} onChange={time => setLongTime(time)} showTimeSelect showTimeSelectOnly timeIntervals={1} dateFormat="h:mm aa" />
                </div>
                <div className="button-group">
                    {(btn_text === 'set_reminder') && <button className="btn"><span className="material-symbols-outlined">notifications_active</span>Set Reminder</button>}
                    {(btn_text === 'edit_reminder') && <button className="btn"><span className="material-symbols-outlined">edit</span>Edit Reminder</button>}
                </div>
            </div>
        </>

            
    )
}

export default Form