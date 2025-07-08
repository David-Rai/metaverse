import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../context/Socket.tsx'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

export const Joinspace = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const socket = useContext(SocketContext)
  const navigate = useNavigate()

  //Socket connection handling
  useEffect(() => {

    socket?.on("joined", (message) => {
      navigate(`/space/${message.space_id}`)
      console.log(message)
    })

    // socket?.on("new-joined",(message)=>{
    //   console.log("some one joined",message)
    // })

  }, [])

  //Handling the joining the space
  const handleSpaceJoin = () => {
    if (inputRef === null) return
    const space_id = inputRef.current && inputRef.current.value
    console.log(space_id)

    //sending to the socket server
    socket?.emit("join-space", { space_id })

  }

  return (
    <main className='main items-center justify-center'>
      <h1 className='text-white m-5'>Joining the space</h1>
      <div className='w-[20%] h-[200px] bg-white rounded-md flex flex-col p-5 items-center justify-center gap-6'>
        <input ref={inputRef} type="text" placeholder='Space id' className='input' />
        <button className='btn' onClick={handleSpaceJoin}>Join Space</button>
      </div>
    </main>
  )
}