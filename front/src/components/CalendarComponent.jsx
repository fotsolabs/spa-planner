import React from 'react'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'


const localizer = momentLocalizer(moment)

const CalendarComponent = () => {
  return (
    
        <Calendar
            localizer={localizer}
            events={[]}
            startAccessor='start'
            endAccessor='end'
            style={{height: '100%'}} >

        </Calendar>
    
  )
}

export default CalendarComponent