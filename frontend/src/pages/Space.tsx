import { nanoid } from 'nanoid'
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { SocketContext } from '../context/Socket'

interface player {
  x: number
  y: number
  id: number
  space_id: string
  user_id: string

}

const Space = () => {
  const navigate=useNavigate()
  const params = useParams<{ spaceID: string }>()
  const socket = useContext(SocketContext)
  const [players, setPlayers] = useState<player[]>([])
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Initial position
  const speed = 10; // Movement speed per key press
  const [user_id, setUserID] = useState<string>("")


  //Socket connection handling
  useEffect(() => {

    //sending to the socket server
    socket?.emit("join-space", { space_id: params.spaceID })

    socket?.on("joined", (message) => {
      toast.success("successfully joined the room")
      setPlayers(message.users)
      setUserID(message.user_id)
    })

    //socket connection established
    socket?.on("connect", () => {
      console.log("connected to the server")
    })

    //When new user joins the room
    socket?.on("new-joined", (message) => {
      console.log("someone joined the room")
      setPlayers(message.users)
    })

    //When user moves
    socket?.on("new-move", ({ users }) => {
      setPlayers(users)
    })

    //Getting the data on rejoin
    socket?.on("rejoin", (message) => {
      console.log("rejoined")
      console.log(message)
      setUserID(message.user_id)
      setPlayers(message.users)
    })

    //Login first
    socket?.on("login-first",()=>{
    toast.error("Login first")
    navigate("/signup")
    })

    return () => {
      socket?.disconnect()
    }
  }, [])

  //For sending my move
  useEffect(() => {
    const space_id = params.spaceID
    //Send the move to the socket server
    socket?.emit("move", { user_id, space_id, x: position.x, y: position.y })
  }, [position])

  // Listen for keydown events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition(prev => {
        switch (e.key) {
          case "ArrowUp":
            return { ...prev, y: prev.y - speed };
          case "ArrowDown":
            return { ...prev, y: prev.y + speed };
          case "ArrowLeft":
            return { ...prev, x: prev.x - speed };
          case "ArrowRight":
            return { ...prev, x: prev.x + speed };
          default:
            return prev;
        }
      });
    };

    // Attach and clean up event
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  
  return (
    <main className='min-h-screen min-w-screen bg-gray-900 relative overflow-hidden'>
    {/* Players only - no background effects */}
    {players.map((player) => (
      <div
        key={player.id}
        className="absolute z-10 transition-transform duration-100 ease-linear"
        style={{
          left: `${player.x}px`,
          top: `${player.y}px`,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div className="relative">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{
              background: player.user_id === user_id 
                ? 'radial-gradient(circle, rgba(239,68,68,1) 0%, rgba(185,28,28,1) 100%)' 
                : 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(29,78,216,1) 100%)',
              boxShadow: player.user_id === user_id 
                ? '0 0 10px rgba(239, 68, 68, 0.7)' 
                : '0 0 8px rgba(59, 130, 246, 0.5)'
            }}
          >
            {player.id}
          </div>
        </div>
      </div>
    ))}
  
  </main>
  
  )
}

export default Space