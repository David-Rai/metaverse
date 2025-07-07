import express from 'express'
import { nanoid } from 'nanoid'
import db from '../models/db.js'
import { handleSpaceCreate } from '../controllers/space.controller.js'

export const spaceRouter = express.Router()

//Creating the room
spaceRouter.post('/space/create', handleSpaceCreate)