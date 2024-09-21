import React from 'react'
import LogNav from '../components/LogNav'
import CalendarComponent from '../components/CalendarComponent'



const DashBoard = ({mode, setMode}) => {
  return (
    <>
      <LogNav mode = {mode} setMode={setMode}/>
      <div className='flex h-full'>
        <div className='w-28 h-full bg-neutral-600 sticky top-0'></div>
        <div className='w-screen h-full'>
        <CalendarComponent />
          
        </div>
      </div>
      
    </>
  )
}

export default DashBoard