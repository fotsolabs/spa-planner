import { useState } from 'react'
import '../src/input.css'
import Login from './pages/login'

function App() {
  const [mode, setMode] = useState('lightMode');
  return (
    <div className={`w-screen h-screen  ${mode === 'lightMode' ? 'bg-lightMode' : 'bg-darkScreen'} ${mode ==='darkScreen' ? 'text-ligtText' : 'text-darkText'} `}>
      <Login mode={mode} setMode={setMode}/> 
    </div>
  )
  // test
}

export default App
