import React, {useState} from 'react'
import LogNav from '../components/LogNav'
import CalendarComponent from '../components/CalendarComponent'

import { dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'; 
import { EventChangePopUP } from '../components/EventChangePopUP'
import StickyBar from '../components/StickyBar'
import { FaCog } from 'react-icons/fa'; // Font Awesome Gear Icon
import { Link } from 'react-router-dom';

const locales = {
  'en-Us': enUS,
};
const date = new Date();
const events = [
  {
    id: 1,
    title: 'Cleaning Service',
    start: new Date(2025, 3, 15, 13, 50),
    end: new Date(2025, 1, 15, 16, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'John Doe',
    price : 100,
  },
  {
    id: 2,
    title: 'Massage',
    start: new Date(2025, 5, 18, 10, 0),
    end: new Date(2025, 5, 18, 19, 0),
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
const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <LogNav mode = {mode} setMode={setMode}/>
      <div className='flex h-full'>
        {/* StickyBar  */}
        <StickyBar bgColor={"bg-stickyBarBg"}>
          {/* photo */}
          <div className=' bg-white w-6 h-5 rounded-full p-9 m-4 shadow-xs'>

          </div>
          {/* settings */}
          <div className='flex justify-center items-center p-9 '>
              <Link to="/settings">
                  <FaCog size={35} color="gray"/>
              </Link>
          </div>
        </StickyBar>
        {/* Calendar component */}
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