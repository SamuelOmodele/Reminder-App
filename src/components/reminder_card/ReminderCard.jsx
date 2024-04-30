import React from 'react'
import './reminderCard.css'

const ReminderCard = ({reminder, removeReminder, setRemToBeEdited}) => {

  return (
      <div className="reminder-card">
          <div className="edit-delete">
              <span className="material-symbols-outlined" onClick={() => setRemToBeEdited(reminder)}>edit</span>
              <span className="material-symbols-outlined" onClick={() => removeReminder(reminder.id)}>delete</span>
          </div>
          <div className="reminder-title"><h4>{reminder.title}</h4></div>
          <div className="reminder-description">{reminder.description}</div>
          <div className="date-time">
              <span className='reminder-date'>{reminder.date}</span>
              {/* -- DISPLAY TIME IN 12 HOURS -- */}
              <span className='reminder-time'>{(reminder.time).toString().slice(0, 2) > 12 ? `${(reminder.time).toString().slice(0, 2)%12}:${(reminder.time).toString().slice(3, 5)} PM` : `${reminder.time} AM`}</span>
          </div>
      </div>
  )
}

export default ReminderCard