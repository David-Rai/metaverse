import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router'
import { nanoid } from 'nanoid'


const Dashboard = () => {
  const socket = io("http://localhost:1111")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  //Socket connection handling
  useEffect(()=>{
   socket.on("connect",()=>{
    console.log("connected to server")
   })


   //Getting the spaceID
   socket.on("spaceCreated",({spaceID})=>{
    console.log(spaceID)
    navigate(`/space/${spaceID}`)
   })
  },[])


  //Handle create space or room
  const handleCreate = () => {
    const newSpaceName = inputRef?.current && inputRef.current.value

    //your unique name
    const myname=nanoid()
    console.log("name",myname)

    //create the socket room or space
    socket.emit("createSpace",{room_name:newSpaceName})
  }

  return (
    <main className='main items-center justify-center'>
      <div className='flex flex-col items-center'>
        <input type="text" placeholder='set a space name' className='input w-[300px]' ref={inputRef} value="ream" />
        <button className='btn' onClick={handleCreate}>Create space</button>
      </div>
    </main>
  )
}

export default Dashboard