import React from 'react'


const InputComponent = ({mode}) => {
  
  return (
    <div className='  flex   items-start border-solid border-2 border-gray-200  p-14 rounded  w-[30rem] shadow-lg' >
        <form action="" method="post " className='flex flex-col gap-[0.01rem]   '>
          <label htmlFor="Email"> Email</label> <br />
          <input type="text" id='Email' className={`border border-gray-300 rounded p-2 mt-2 w-[24rem] text-darkText`} />
          <br />
          <label htmlFor="Password"> Password</label> <br />
          <input type="password" id='Password' className="border border-gray-300 rounded p-2 mt-2 text-darkText " />
          <br />
          <button type="button" className=' bg-blue-300  rounded p-2 mt-2 flex justify-center'> Signin </button>
        </form>
    </div>
  )
}

export default InputComponent