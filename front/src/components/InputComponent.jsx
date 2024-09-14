// Author: Larry Fotso GUiffo
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const InputComponent = ({mode}) => {
  const [email, setEmail] = useState(''); // will contain the email
  const [password, setPassword] = useState(''); // will contain the password
  const [message, setMessage] = useState(''); // will contain a message if the email or password is incorrect
  const [token, setToken] = useState(''); // will contain the token if the email and password are correct
  const [employees, setEmployees] = useState([]); // will contain the list of employees if the email and password are correct
  const [photo , setPhoto] = useState(''); // will contain the photo of the employee
  const nagivate = useNavigate();
  
  async function handleSubmit(e) {
   
    e.preventDefault();
    if ( email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }
    else{
      try{
      const response = await fetch('http://localhost:3000/api/v1/login', 
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })

      if(response.ok){ 
        const data = await response.json();
        if(data.message ==="Invalid password or email"){  // check if the email and password are correct
          setMessage(data.message);
        }
        else{
          setToken(data.token);
          setEmployees(data.employees);
          setPhoto(data.photo);
          localStorage.setItem('token', data.token);
          console.log(data.message);
          nagivate('/dashboard');
        }
       
      }
      else{
        
        console.log("Error:",response);
      }
     
    }
    catch(error){
      console.log("Error:", error);
    }
  }
}

    

  
  
  return (
    <div className='  flex   items-start border-solid border-2 border-gray-200  p-14 rounded  w-[30rem] shadow-lg' >
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-[0.01rem]   '>
          <label htmlFor="Email" > Email</label> <br />
          <input type="text" id='Email' className={`text-darkText border border-gray-300 rounded p-2 mt-2 w-[24rem] ` }  value={email}  onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label htmlFor="Password"> Password</label> <br />
          <input type="password" id='Password' className="border border-gray-300 rounded p-2 mt-2 text-darkText " value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit" className=' bg-blue-300  rounded p-2 mt-2 flex justify-center' > Signin </button>
          <p className='text-red-400'>{message}</p>
        </form>
    </div>
    
  )
}

export default InputComponent