import React from 'react'
import './reminderBox.css'
import { useState, useEffect, useRef} from 'react';
import clock from '../../assets/clock-img.png';
import ReminderForm from '../reminder_form/ReminderForm';
import EditForm from '../alert_popup/EditForm';
import ActiveReminder from '../alert_popup/ActiveReminder';
import ReminderCard from '../reminder_card/ReminderCard';
import music from '../../assets/ringtone.mp3';


const ReminderBox = () => {

    // -- state variables 
    const [reminderList, setReminderList] = useState([]);
    const [activeReminder, setActiveReminder] = useState(null);
    const [remToBeEdited, setRemToBeEdited] = useState(null);
    const audioRef = useRef(null);
    const audioElement = audioRef.current;
    

    // -- fetch the reminder list from local storage when the page loads --
    useEffect(() => {
        const storedReminderList = JSON.parse(localStorage.getItem('ReminderList'));
        if (storedReminderList) {
            setReminderList(storedReminderList);
            
            // -- remove reminders whose due time has passed while the page was closed
            const currentTimeString = currentDateTimeString()[0];
            const currentDateString = currentDateTimeString()[1];

            storedReminderList.forEach(reminder => {
                if (currentDateString > reminder.date || (currentDateString === reminder.date && currentTimeString > reminder.time)) {
                    removeReminder(reminder.id);
                }
            });
        }

    }, [])

    
    // --  check for due reminder every second
    useEffect(() => {
        const interval = setInterval(() => {
            checkReminder();
        }, 1000);
    
        return () => clearInterval(interval);
    }, [reminderList]);

    // -- check if reminder is due
    const checkReminder = () => {
        
        const currentTimeString = currentDateTimeString()[0];
        const currentDateString = currentDateTimeString()[1];
    
        reminderList.forEach(reminder => {
            if (currentDateString === reminder.date && currentTimeString === reminder.time) {
                setActiveReminder(reminder);
            }
        });
    };

    // -- get current date string and time string 
    const currentDateTimeString = () => {
        const currentDate = new Date();
    
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const currentTimeString = `${hours}:${minutes}`;
    
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        const currentDateString = `${year}-${month}-${day}`;

        return ([currentTimeString, currentDateString]);
    }


    // -- remove/delete reminder 
    const removeReminder = (id) => {
        const index = reminderList.findIndex(reminder => reminder.id === id);
        const updatedReminderList = [...reminderList];
        updatedReminderList.splice(index, 1);
        localStorage.setItem('ReminderList', JSON.stringify(updatedReminderList));
        setReminderList(updatedReminderList);
    }
 
  return (
    <>
        <div className="box">
            <img src={clock} className="clock" alt="" />
            <h3>A Reminder App</h3>

            <ReminderForm reminderList={reminderList} setReminderList={setReminderList} currentDateTimeString={currentDateTimeString} />
            
            {reminderList.map((reminder, index) => (
                <ReminderCard reminder={reminder} removeReminder={removeReminder}  setRemToBeEdited={setRemToBeEdited} key={index}/>
            ))}
        </div>

        {activeReminder &&
            <ActiveReminder activeReminder={activeReminder} setActiveReminder={setActiveReminder} removeReminder={removeReminder} audioElement={audioElement}/>
        }
        {remToBeEdited && 
            <EditForm reminder={remToBeEdited} setRemToBeEdited={setRemToBeEdited} reminderList={reminderList} setReminderList={setReminderList} currentDateTimeString={currentDateTimeString}/>
        }

        {/* -- audio to be played -- */}
        <audio src={music} controls id='audio' ref={audioRef} />
        
    </>
  )
}

export default ReminderBox