import express from 'express';
import { handleRoomCreate } from '../controllers/room.controller.js';
export const roomRouter = express.Router();
//Creating the room
roomRouter.post('/room/create', handleRoomCreate);
