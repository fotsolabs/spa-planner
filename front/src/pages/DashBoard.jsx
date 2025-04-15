import React from 'react'
import LogNav from '../components/LogNav'
import CalendarComponent from '../components/CalendarComponent'
import Calendar from '../components/Calendar'
import TUICalendar from '../components/TUICalendar'
import { dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'; 

const locales = {
  'en-Us': enUS,
};
const date = new Date();
const events = [
  {
    id: 1,
    title: 'Kickoff Meeting',
    start: new Date(2025, 3, 15, 13, 50),
    end: new Date(2025, 3, 15, 16, 0),
    allDay: false,
    isDraggable: true,
  },
  {
    id: 2,
    title: 'Lunch Break',
    start: new Date(2025, 3, 15, 12, 0),
    end: new Date(2025, 3, 15, 13, 0),
    allDay: false,
    isDraggable: true,
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
  return (
    <>
      <LogNav mode = {mode} setMode={setMode}/>
      <div className='flex h-full'>
        <div className='w-28 h-full bg-neutral-600 sticky top-0'></div>
        <div className='w-screen h-full'>
        <CalendarComponent localizer={localizer} events={events} />
        </div>
      </div>
      
    </>
  )
}

export default DashBoard