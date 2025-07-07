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

  //Socket connection handling
  useEffect(() => {
    const space_id = params.spaceID


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

    
    </main>
  )
}

export default Space