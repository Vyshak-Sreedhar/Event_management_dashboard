import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import attendeeRoutes from './routes/attendees.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/attendees', attendeeRoutes);
app.use('/api/tasks', taskRoutes);

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('taskUpdate', (data) => {
    io.emit('taskUpdated', data);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});