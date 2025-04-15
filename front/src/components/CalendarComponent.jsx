import React, {useCallback, useMemo, useState} from 'react'
import {Calendar,Views,DateLocalizer} from 'react-big-calendar'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';


const DragAndDropCalendar = withDragAndDrop(Calendar);






const CalendarComponent = ({localizer, events, setEditingEvent,setMyEvents ,handleClickEvent}) => {


    
    const [draggedEvent, setDraggedEvent] = useState();
    const [displayDragItemInCell, setDisplayDragItemCell] = useState(true);
    const [counters, setCounters] = useState({item1: 0, items2: 0});
    

    const eventPropGetter = useCallback(
        (event) => ({
            className: event.isDraggable ? 'is-draggable' : 'not-draggable',
        }), 
       []
    );

    const handleDragStart = useCallback((event) => setDraggedEvent(event), []);

    const dragFromOutsideItem = useCallback(() => draggedEvent === 'undroppable' ? null  : draggedEvent, [draggedEvent]);

    const customOnDragOverFromOutside = useCallback((draggedEvent) => {
        if (draggedEvent === 'undroppable') {
            draggedEvent.preventDefault();
        }
    }, [draggedEvent]);

    const handleDisplayDragItemCell = useCallback(
        () => setDisplayDragItemCell((prev) => !prev), []) 
    const moveEvent = useCallback(
        ({event, start, end, isAllDay:droppedOnAllDaySlot = false}) => {
            const {allDay} = event;
            if(!allDay && droppedOnAllDaySlot){
                event.allDay = true;
            }
            setMyEvents((prev) => {
                const existing = prev.find((ev) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev) => ev.id !== event.id)
                return [...filtered,{...existing,start,end,allDay}]
            }),
            [setMyEvents]
        }
    )

    const newEvent = useCallback(
        (event) => {
            setMyEvents((prev) => {
                const idList = prev.map((ev) => ev.id);
                const newId = Math.max(...idList) + 1;
                return [...prev, {...event, id: newId}]
            })
        }, [setMyEvents]
    )

    const onDropFromOutside = useCallback(
        ({ start, end, allDay: isAllDay }) => {
          if (draggedEvent === 'undroppable') {
            setDraggedEvent(null)
            return
          }
    
          const { name } = draggedEvent
          const event = {
            title: formatName(name, counters[name]),
            start,
            end,
            isAllDay,
          }
          setDraggedEvent(null)
          setCounters((prev) => {
            const { [name]: count } = prev
            return {
              ...prev,
              [name]: count + 1,
            }
          })
          newEvent(event)
        },
        [draggedEvent, counters, setDraggedEvent, setCounters, newEvent]
    )

    const resizeEvent = useCallback(
        ({ event, start, end }) => {
          setMyEvents((prev) => {
            const existing = prev.find((ev) => ev.id === event.id) ?? {}
            const filtered = prev.filter((ev) => ev.id !== event.id)
            return [...filtered, { ...existing, start, end }]
          })
        },
        [setMyEvents]
    )
    
    const defaultDate = useMemo(() => new Date(2025,4,15),[]);

   

   
    
    
  return (
    console.log(events),
    
            <DragAndDropCalendar
                defaultDate={new Date()}
                defaultView={Views.WEEK}
                dragFromOutsideItem={
                displayDragItemInCell ? dragFromOutsideItem : null
                }
                draggableAccessor="isDraggable"
                eventPropGetter={eventPropGetter}
                events={events}
                localizer={localizer}
                onDropFromOutside={onDropFromOutside}
                onDragOverFromOutside={customOnDragOverFromOutside}
                onEventDrop={moveEvent}
                resizable
                onEventResize={resizeEvent}
                onSelectSlot={newEvent}
                onSelectEvent={handleClickEvent}
                selectable
            />
    )
}

export default CalendarComponent