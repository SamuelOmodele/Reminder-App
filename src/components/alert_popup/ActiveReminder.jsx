import React, { useEffect } from 'react'
import './alertPopup.css'
import alarm from '../../assets/alarm.png'

const ActiveReminder = ({activeReminder, setActiveReminder,  removeReminder, audioElement}) => {

    // -- Play audio once the component comes up
    useEffect(() => {
        if (audioElement){
            playAudio();
        }
    }, [])

    const playAudio = () => {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    // -- close reminder popup
    const closeReminderAlert = (id) =>{
        setActiveReminder(null);
        audioElement.pause();
        removeReminder(id);
    }


  return (
    <>
        <div className="alert-bg"></div>
        <div className="alert active-reminder">
            <span className="material-symbols-outlined close" onClick={() => closeReminderAlert(activeReminder.id)}>close</span>
            <img src={alarm} alt="" />
            <h2>Your <span className='purple-color'><b>Reminder</b></span> is Due</h2>

            <div className="reminder-card">
                <div className="reminder-title"><h4>{activeReminder.title}</h4></div>
                <div className="reminder-description">{activeReminder.description}</div>
                <div className="date-time">
                    <span className='reminder-date'>{activeReminder.date}</span>
                    {/* -- DISPLAY TIME IN 12 HOURS -- */}
                    <span className='reminder-time'>{(activeReminder.time).toString().slice(0, 2) > 12 ? `${(activeReminder.time).toString().slice(0, 2)%12}:${(activeReminder.time).toString().slice(3, 5)} PM` : `${activeReminder.time} AM`}</span>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default ActiveReminder