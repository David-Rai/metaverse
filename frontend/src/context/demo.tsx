import React from 'react'
import {io,Socket} from 'socket.io-client'

export const socket=React.useRef<Socket>(io('http://localhost:1111'))

