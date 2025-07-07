import express from 'express';
import { handleSpaceCreate } from '../controllers/space.controller.js';
export const spaceRouter = express.Router();
//Creating the room
spaceRouter.post('/space/create', handleSpaceCreate);
