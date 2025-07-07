import { createContext, useEffect } from "react"
import { io, Socket } from 'socket.io-client'
import type { ReactNode } from "react"

//Socket context
export const SocketContext = createContext<Socket | null>(null)

interface Props {
    children: ReactNode
}
 
//Socket context provider
export const SocketProvider = ({ children }: Props) => {
    const socket = io("http://localhost:1111",{
      autoConnect:false
    })

    //Clean up function
    useEffect(()=>{

      socket.connect()

      return ()=>{
        socket.disconnect()
      }
    },[])

    return (
        <SocketContext.Provider value={ socket }>
          {children}
        </SocketContext.Provider>
      );

}
