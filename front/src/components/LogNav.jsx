import React from 'react'
import { CgDarkMode } from "react-icons/cg";
import { useState } from 'react';
import { LightMode } from '@mui/icons-material';



const LogNav = ({mode, setMode}) => {
  console.log(mode)
  return (
    <div className={`flex justify-between items-center ml-3 mr-3 border-solid border-b-2 border-gray-200 p-3 shadow-lg ${mode === 'lightMode' ? 'bg-lightMode' : 'bg-darkScreen'} ${mode ==='darkScreen' ? 'text-ligtText' : 'text-darkText'}`}>

        <div className='text-blue-500 font-bold text-4xl' >
            <span className='bg-blue-500 text-white p-1 mr-2'>LF</span>
            PLANNER 
        </div>

        <div className='flex justify-between gap-5 items-center'>
            <CgDarkMode className='text-3xl' onClick={() => {console.log(mode),setMode(mode === 'lightMode' ? 'darkScreen' : 'lightMode' )}}/>
            FR | EN
        </div>
            
    </div>
  )
}

export default LogNav