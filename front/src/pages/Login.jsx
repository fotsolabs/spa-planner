 
import React from 'react'
import LogNav from '../components/LogNav'
import InputComponent from '../components/InputComponent'

const Login = ({mode, setMode}) => {
  return (
   <>
     <LogNav mode={mode} setMode={setMode}/>
     <div className={`flex  w-full h-full items-center justify-center  ${mode === 'lightMode' ? 'bg-lightMode' : 'bg-darkScreen'}  `}  >
     
        <InputComponent/>
     </div>
   </>
  )
}

export default Login