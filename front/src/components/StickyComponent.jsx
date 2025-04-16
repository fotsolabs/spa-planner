import React from 'react'

 const stickyComponent = ({component,text}) => {
  return (
    <div className='flex  text-center justify-center items-center pr-3 pt-3 pb-3 gap-1  rounded-xl mr-3 mt-2 hover:bg-[#62998a]'>
        {component}
        <span> {text}</span>
    </div>
  )
}
export default stickyComponent