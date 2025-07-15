import React, {useState,useCallback,useEffect} from 'react'
import LogNav from '../components/LogNav'
import CalendarComponent from '../components/CalendarComponent'

import { dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, set } from 'date-fns'
import enUS from 'date-fns/locale/en-US'; 
import { EventChangePopUP } from '../components/EventChangePopUP'
import StickyBar from '../components/StickyBar'
import { FaCog } from 'react-icons/fa'; // Font Awesome Gear Icon
import { Link } from 'react-router-dom';
import EventModal from '../components/modals/EventModal'
import PageUtils from './utils/PageUtils'
import { use } from 'react'
import ServiceApi from '../api/ServiceApi'


const locales = {
  'en-Us': enUS,
};
const date = new Date();
const events1 = [
  {
    id: 1,
    title: 'Cleaning Service',
    start: new Date(2025, 6, 9, 13, 50), // July is month 6 (0-based)
    end: new Date(2025, 6, 9, 16, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'John Doe',
    price: 100,
  },
  {
    id: 2,
    title: 'Massage',
    start: new Date(2025, 6, 9, 10, 0),
    end: new Date(2025, 6, 9, 19, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'Jane Smith',
    price: 150,
  },
];

const events2 = [
  {
    id: 1,
    title: 'Cleaning Service',
    start: new Date(2025, 6, 8, 13, 50), // July is month 6 (0-based)
    end: new Date(2025, 6, 8, 16, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'John Doe',
    price: 100,
  },
  {
    id: 2,
    title: 'Massage',
    start: new Date(2025, 6, 7, 10, 0),
    end: new Date(2025, 6, 7, 19, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'Jane Smith',
    price: 150,
  },
];

const events3 = [
  {
    id: 1,
    title: 'Cleaning Service',
    start: new Date(2025, 6, 10, 13, 50), // July is month 6 (0-based)
    end: new Date(2025, 6, 10, 16, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'John Doe',
    price: 100,
  },
  {
    id: 2,
    title: 'Massage',
    start: new Date(2025, 6, 11, 10, 0),
    end: new Date(2025, 6, 11, 19, 0),
    allDay: false,
    isDraggable: true,
    clientName: 'Jane Smith',
    price: 150,
  },
];

const allEvents = [ ...events1, ...events2, ...events3 ];


const employees = [
  {
    photo: 'https://example.com/photo1.jpg',
    fullName: 'John Doe',
    email: 'johno@ReportGmailerrorred.com',
    phone: '+1234567890',
    events: events1,
  },
  {
    photo: 'https://example.com/photo2.jpg',
    fullName: 'Jane Smith',
    email:'JaneSmith@gmail.com',
    phone: '+0987654321',
    events: events2,

  },
  {
    photo: 'https://example.com/photo3.jpg',
    fullName: 'Alice Johnson',
    email:"AliceJohnson@mgmail.com",
    phone: '+1122334455',
    events: events3,
  }
]






const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})




const DashBoard = ({mode, setMode}) => {
  const changeEvents = (employee) => {
    console.log("Changing events for employee:", employee);
    const selectedEmployee = employees.find(emp => emp.fullName === employee);
    setEmployee(selectedEmployee);
    setMyEvents(selectedEmployee.events);
  }
  const [services, setServices] = useState([]);
  const [employee, setEmployee] = useState(employees[0]); // Default to the first employee
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ServiceApi.getAllServices();
        console.log("Fetched services:", response.services);
        setServices(response.services);
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      }
    }
    fetchServices();
  }, []);

  const [editingEvent, setEditingEvent] = useState(null);
   // Helps to change the title of the event when it is clicked
   const [myEvents, setMyEvents] = useState(employee.events); 
   const [showEventModal, setShowEventModal] = useState(false);
   const [selectedSlot, setSelectedSlot] = useState(null);

   const handleClickEvent = (event) => {
    setEditingEvent(event);
    
   }
const handleSlotSelect = useCallback((slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowEventModal(true);
    // This function can be used to open a modal to add a new event
    // You can pass the slotInfo to the modal to pre-fill the start and end time
}, []);
const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <LogNav mode = {mode} setMode={setMode}/>
      <div className='flex h-full'>
        {/* StickyBar  */}
        <StickyBar bgColor={"bg-stickyBarBg"}>
          {/* Employee selector */}
          <div className='flex justify-center  items-center p-9 pb-3 '>
              <select className='bg-white px-8 py-1 rounded-md ' onChange={(e) => changeEvents(e.target.value)}>
                {employees.map((employee, index) => (
                  <option key={index} value={employee.fullName}>
                    {employee.fullName}
                  </option>
                ))}
              </select>
          </div>
          {/* photo */}
          <div className='flex justify-center'>
              <div className='relative flex justify-center items-center bg-white w-6 h-5 rounded-md px-[6rem] py-12 p-9 m-4 shadow-xs overflow-hidden'>
                    <img 
                      src='../../public/vite.svg'
                      alt={employee.fullName} 
                      className='absolute inset-0 w-full h-full object-cover z-0' 
                    />
              </div>
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
          handleSlotSelect={handleSlotSelect}

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

      {showEventModal && selectedSlot && (
        <EventModal
          setMyEvents={setMyEvents}
          setShowEventModal = {setShowEventModal}
          services={services}
          slotInfo={selectedSlot}
        />
      )}

      
    </>
  )
}

export default DashBoard