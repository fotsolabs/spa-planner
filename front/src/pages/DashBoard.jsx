import React, {useState} from 'react'
import LogNav from '../components/LogNav'
import CalendarComponent from '../components/CalendarComponent'
import Calendar from '../components/Calendar'
import TUICalendar from '../components/TUICalendar'
import { dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'; 
import { EventChangePopUP } from '../components/EventChangePopUP'

const locales = {
  'en-Us': enUS,
};
const date = new Date();
const events = [
  {
    id: 1,
    title: 'Cleaning Service',
    start: new Date(2025, 3, 15, 13, 50),
    end: new Date(2025, 3, 15, 16, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'John Doe',
    price : 100,
  },
  {
    id: 2,
    title: 'Massage',
    start: new Date(2025, 3, 15, 12, 0),
    end: new Date(2025, 3, 15, 13, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'Jane Smith',
    price : 150,
  },
];

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const DashBoard = ({mode, setMode}) => {
  const [editingEvent, setEditingEvent] = useState(null);
   // Helps to change the title of the event when it is clicked
   const [myEvents, setMyEvents] = useState(events); 
   const handleClickEvent = (event) => {
    setEditingEvent(event);
    
  }
  return (
    <>
      <LogNav mode = {mode} setMode={setMode}/>
      <div className='flex h-full'>
        <div className='w-28 h-full bg-neutral-600 sticky top-0'></div>
        <div className='w-screen h-full'>
        <CalendarComponent 
          key ={myEvents.length}
          localizer={localizer}  
          events={myEvents} 
          setMyEvents={setMyEvents}
          setEditingEvent={setEditingEvent} 
          handleClickEvent={handleClickEvent}
          />
        </div>
      </div>
      {/* popUp editing window */}
    
      {editingEvent && (
        <EventChangePopUP
          id={editingEvent.id}
          title={editingEvent.title}
          clientName={editingEvent.clientName}
          events={myEvents}
          setMyEvents={setMyEvents}
          onClose={() => setEditingEvent(null)}
        />
      )}
      
      
      
    </>
  )
}

export default DashBoard