import { nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { io } from 'socket.io-client'

interface player {
  x: number
  y: number
  id: string
}

const Space = () => {
  const params = useParams<{ spaceID: string }>()
  const socket = io('http://localhost:1111')
  const myID = nanoid()
  const [players, setPlayers] = useState<player[]>([])
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Initial position
  const speed = 10; // Movement speed per key press

  useEffect(() => {
    const spaceID = params.spaceID

    //Joining the socket room
    socket.emit("joinSpace", { spaceID, userID: myID })

    //Joined message
    socket.on("spaceID", ({ spaceID }) => {
      console.log("you have joined", spaceID)

    })


    //someone joined
    socket.on("someoneJoin", ({ userID ,rooms}) => {
      console.log(rooms)
      setPlayers([...players, { x: 0, y: 0, id: userID }])
      alert("New user")
      console.log("new user", userID)
    })



  }, [])

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
    <main className='h-screen w-full bg-gray-700'>

      {
        players.length > 0 && players.map((p) => {
          return (
            <div key={p.id}
              className='h-[100px] w-[100px] bg-green-500 absolute text-[8px]'
              style={{ left: p.x, top: p.y }}
            >{p.id}</div>
          )
        })
      }

      <div className='h-[100px] w-[100px] bg-red-500 absolute'
        style={{
          left: position.x,
          top: position.y,
        }}
      >me</div>
    </main>
  )
}

export default Space