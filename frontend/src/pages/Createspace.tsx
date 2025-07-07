import React, { useEffect, useRef } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../context/Socket.tsx'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

const Createspace = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const socket = useContext(SocketContext)
  const navigate = useNavigate()


  //Socket connection handling
  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("connected to server")
      toast.success("connnection established")
    })


    //Getting the spaceID
    socket.on("space-created", (message) => {
      console.log("from server",message)
      navigate(`/space/${message.space_id}`)
    })
  }, [])

  //Creating the space
  const handleCreateSpace = () => {
    if (inputRef === null) return
    const space_name = inputRef.current && inputRef.current.value
    console.log(space_name)

    //sending to the socket server
    socket?.emit("space-create",{space_name})

  }

  return (
    <main className='main items-center justify-center'>
      <h1 className='text-white m-5'>Creating the new space</h1>
      <div className='w-[20%] h-[200px] bg-white rounded-md flex flex-col p-5 items-center justify-center gap-6'>
        <input type="text" placeholder='Name for the space' className='input' ref={inputRef} />
        <button className='btn' onClick={handleCreateSpace}>Create Space</button>
      </div>
    </main>
  )
}

export default Createspace