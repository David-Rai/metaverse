import React from 'react'
import { Nav } from './Nav'
import { useNavigate } from 'react-router'


const Home = () => {
const navigate=useNavigate()

//Navigating to the signup and signin page
const handleStart=()=>{
  navigate('/signup')
}

  return (
    <main className='main'>
      {/* NavBar */}
      <Nav />

            {/* Main content */}
      <div className="h-[calc(100%_-_80px)] flex items-center justify-center w-full flex-col  text-white px-4 text-center">
        <p className="text-2xl md:text-4xl font-bold max-w-xl">
          Connect, Communicate, and Play —
          Experience the Future of Social Interaction in the Metaverse.
        </p>
        <button className='btn' onClick={handleStart}>Get Started</button>
      </div>

    </main>
  )
}

export default Home