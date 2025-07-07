import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home.tsx'
import Signin from './pages/Signin.tsx';
import Signup from './pages/Signup.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Space from './pages/Space.tsx';
import Createspace from './pages/Createspace.tsx';
import { Joinspace } from './pages/Joinspace.tsx';
import { SocketProvider } from './context/Socket.tsx';
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/space/:spaceID" element={<Space />} />
          <Route path="/createspace" element={<Createspace/>} />
          <Route path="/joinspace" element={<Joinspace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1000} />
  </SocketProvider>
)
