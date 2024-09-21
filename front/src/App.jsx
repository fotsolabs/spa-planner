import { useState,} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/input.css';
import Login from './pages/Login';  
import DashBoard from './pages/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [mode, setMode] = useState('lightMode');

  return (

      <div className={`w-screen h-screen ${mode === 'lightMode' ? 'bg-lightMode' : 'bg-darkScreen'} ${mode === 'darkScreen' ? 'text-lightText' : 'text-darkText'}`}>
      <Router>
        <Routes>
          <Route path='/' element={<Login mode={mode} setMode={setMode} />} /> <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashBoard mode = {mode} setMode={setMode}/>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
