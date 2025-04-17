import './App.css'
import { useState, useEffect } from 'react';
import { Intro } from './components/Intro'
import { Loader } from './components/Loader' 
import { Routes, Route, Navigate } from 'react-router-dom';
import { DrawingCanvas } from './components/DrawingCanvas';

function App() {
  const [isExisting, setIsExisting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(()=> { 
          setIsExisting(true);
          setTimeout(() =>setIsLoading(false), 500)
        }, 4000);
          
        return () => {
            clearTimeout(timer);
        };
    }, []);

  return (
    <>
      { isLoading && <Loader className={isExisting ? "fade-out" : ""}/>}
      <Routes>
        <Route 
          path="/" 
          element={isLoading ? <Navigate to="/intro" replace /> : <Intro />} 
        />
        <Route path="/intro" element={<Intro />} />
        <Route path="/drawing-canvas" element={<DrawingCanvas />} />
      </Routes>
    </>
  )
}

export default App
