import { useState,} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/input.css';
import Login from './pages/Login';  
import DashBoard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './pages/Settings';


function App() {
  const [mode, setMode] = useState('lightMode');

  return (

      <div className={`w-screen h-screen ${mode === 'lightMode' ? 'bg-lightMode' : 'bg-darkScreen'} ${mode === 'darkScreen' ? 'text-lightText' : 'text-darkText'}`}>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path='/' element={<Login mode={mode} setMode={setMode} />} /> 
          {/* Dashboard Route */}
          {/* ProtectedRoute will check if the user is logged in or not */}
          {/* If the user is not logged in, it will redirect to the login page */}
          {/* If the user is logged in, it will render the dashboard page */}
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashBoard mode = {mode} setMode={setMode}/>
            </ProtectedRoute>
          } 
          />
          <Route path="/settings" 
            element={
              <ProtectedRoute>
                <Settings mode = {mode} setMode={setMode} bgColor={"bg-settingsBg"}/>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
