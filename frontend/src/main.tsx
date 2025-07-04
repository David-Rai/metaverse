import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home.tsx'
import Signin from './pages/Signin.tsx';
import Signup from './pages/Signup.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Space from './pages/Space.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/signup" element={<Signup />}/>
     <Route path="/signin" element={<Signin />}/>
     <Route path="/dashboard" element={<Dashboard />}/>
     <Route path="/space/:spaceID" element={<Space />}/>
      </Routes>
    </BrowserRouter>
  </>
)
