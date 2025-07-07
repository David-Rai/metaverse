import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router'
import { nanoid } from 'nanoid'


const Dashboard = () => {
  // const socket = io("http://localhost:1111")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()



  return (
    <main className='main'>

      {/* Navigation */}
      <nav className='flex w-full h-[10%] items-center gap-5 justify-end px-5'>
        <button className='btn' onClick={() => navigate('/createspace')} >Create new space</button>
        <button className='btn' onClick={() => navigate("/joinspace")}>Join space</button>
      </nav>

      {/* Rooms container */}
      <section className='h-[90%] w-full p-5'>
        <h1 className='text-white'>Active Rooms</h1>
      </section>
    </main>
  )
}

export default Dashboard