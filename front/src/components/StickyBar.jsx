import React from 'react'
import { FaCog } from 'react-icons/fa'; // Font Awesome Gear Icon
import { Link } from 'react-router-dom';


const StickyBar = ({children, bgColor}) => {
  return (
    <div className={`w-30 h-full ${bgColor} sticky top-0 flex flex-col`}>
        {children}
    </div>
  )
}

export default StickyBar