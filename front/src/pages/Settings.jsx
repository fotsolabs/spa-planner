import React from 'react'
import LogNav from '../components/LogNav'
import StickyBar from '../components/StickyBar'
import { GiStoneStack, } from 'react-icons/gi';
import { FaCog } from 'react-icons/fa'; // Font Awesome Gear Icon
import StickyComponent from '../components/stickyComponent'
import { IoIosLogOut } from "react-icons/io";
import { FaPersonCirclePlus } from "react-icons/fa6";
 const Settings = ({mode, setMode, bgColor}) => {
    
  return (
    <div className={`h-screen ${bgColor} flex  justify-center items-center`}>
        
        <StickyBar bgColor={"bg-stickyBarBg"}>
            <div className='flex flex-col justify-between h-screen '>
                <div>
                    <div className='p-9 flex justify-center items-center '>
                    <div>
                            <GiStoneStack size={36} className='text-creamyGreen'/>
                    </div>
                        <span className='text-4xl text-[#4d7c6f]' >LF</span>
                    </div>
                    {/* setting */}
                    <StickyComponent component={<FaCog size={15} className="text-creamyGreen"/>} text='Settings'/>
                    {/* Add employee */}
                    <StickyComponent component={<FaPersonCirclePlus size={15} className="text-creamyGreen"/>} text='Employee'/>
                    {/* Add client */}
                </div>
               
                {/* logout */}
                <div>
                    <StickyComponent component={<IoIosLogOut size={20} className="text-creamyGreen"/>} text={'Logout'}/>
                </div>

            </div>
           
            
        </StickyBar>
        

        {/* Main content */}
        <div className='bg-white h-5/6 w-screen m-10 rounded-lg  shadow-sm'>
            {/* Title */}
            <div className=' items-center  p-8'>
                <h1 className='text-4xl font-bold text-left'>Settings & Pricing</h1>
            </div>
        </div>

    </div>
  )
}
export default Settings