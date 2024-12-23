import express from 'express';
import { createTask, getTasks, updateTaskStatus, deleteTask } from '../controllers/taskController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.use(auth);
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTaskStatus);
router.delete('/:id', deleteTask);

export default router;