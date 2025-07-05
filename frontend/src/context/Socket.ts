// import { createContext } from "react"
// import { io, Socket } from 'socket.io-client'
// import { useContext } from "react"
// import type { ReactNode } from "react"

// //Socket context
// export const SocketContext = createContext<Socket | null>(null)

// interface Props {
//     children: ReactNode
// }

// //Socket context provider
// export const SocketProvider = ({ children }: Props) => {
//     const socket : Socket = io("http://localhost:1111")

//     return (
//         <SocketContext.Provider value={{socket}}>
//         { children }
//         </SocketContext.Provider>
//     )

// }

// //UseSocket hook to consume the socket
// export const useSocket = () => {
//     const context = useContext(SocketContext)

//     if (!context) return
//     return context
// }