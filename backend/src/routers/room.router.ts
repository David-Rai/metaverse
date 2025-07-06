import express from 'express'
import { nanoid } from 'nanoid'
import db from '../models/db.js'
import { handleRoomCreate } from '../controllers/room.controller.js'

export const roomRouter = express.Router()

//Creating the room
roomRouter.post('/room/create', handleRoomCreate)