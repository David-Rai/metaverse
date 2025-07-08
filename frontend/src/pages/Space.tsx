import { nanoid } from 'nanoid'
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
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
  const params = useParams<{ spaceID: string }>()
  const socket = useContext(SocketContext)
  const [players, setPlayers] = useState<player[]>([])
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Initial position
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
      console.log("your id", message.user_id)
    })

    //socket connection established
    socket?.on("connect", () => {
      console.log("connected to the server")
    })

    //When new user joins the room
    socket?.on("new-joined", (message) => {
      console.log("someone joined the room")
      setPlayers(message.users)
      console.log(message)
    })

    //When user moves
    socket?.on("new-move",({users})=>{
      setPlayers(users)
    })

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
    <main className='min-h-screen min-w-screen bg-gray-700'>
      {players.map((player) => (
        <div
          key={player.id}
          className="flex w-6 h-6 rounded-full text-white text-xs absolute"
          style={{
            left: `${player.x}px`,
            top: `${player.y}px`,
            backgroundColor: player.user_id === user_id ? "red" : "blue"
          }}
          title={`User: ${player.user_id}`}
        >
          {player.id}
        </div>
      ))}
      {/* <div
          className="flex w-6 h-6 bg-red-500 rounded-full text-white text-xs absolute"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          me
        </div> */}
    </main>
  )
}

export default Space