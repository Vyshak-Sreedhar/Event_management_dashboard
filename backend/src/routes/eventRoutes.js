import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.post('/', createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;