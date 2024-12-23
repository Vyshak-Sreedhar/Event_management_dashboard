import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Button,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { Calendar } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL);

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchEvents();
    fetchTasks();

    socket.on('taskUpdated', handleTaskUpdate);
    socket.on('taskCreated', handleTaskCreate);

    return () => {
      socket.off('taskUpdated');
      socket.off('taskCreated');
    };
  }, []);

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    toast({
      title: 'Task Updated',
      status: 'success',
      duration: 3000,
    });
  };

  const TaskProgress = ({ task }) => {
    const progress = tasks.filter(t => t.event === task.event && t.status === 'completed').length / 
                    tasks.filter(t => t.event === task.event).length * 100;

    return (
      <Box>
        <Progress value={progress} colorScheme="green" size="sm" />
        <Text fontSize="sm" mt={1}>{Math.round(progress)}% Complete</Text>
      </Box>
    );
  };

  const EventCalendar = () => (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <Calendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map(event => ({
          title: event.name,
          date: event.date,
          id: event._id,
          extendedProps: {
            description: event.description,
            location: event.location
          }
        }))}
        eventClick={handleEventClick}
      />
    </Box>
  );

  return (
    <Container maxW="container.xl" py={5}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        <Box>
          <Heading size="lg" mb={5}>Event Dashboard</Heading>
          <Button colorScheme="blue" onClick={onOpen}>Create Event</Button>
        </Box>
        <EventCalendar />
        <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} />
      </Grid>

      <EventModal isOpen={isOpen} onClose={onClose} onEventCreate={handleEventCreate} />
    </Container>
  );
}

const TaskList = ({ tasks, onTaskUpdate }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>Tasks</Heading>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} onUpdate={onTaskUpdate} />
      ))}
    </Box>
  );
};

export const TaskCard = ({ task, onUpdate }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTask = await response.json();
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={3}>
      <Heading size="sm">{task.name}</Heading>
      <Text color="gray.600" mb={2}>{task.description}</Text>
      <HStack spacing={4}>
        <Badge colorScheme={
          task.status === 'completed' ? 'green' : 
          task.status === 'in-progress' ? 'yellow' : 'red'
        }>
          {task.status}
        </Badge>
        <Badge colorScheme={
          task.priority === 'high' ? 'red' :
          task.priority === 'medium' ? 'yellow' : 'green'
        }>
          {task.priority}
        </Badge>
      </HStack>
      <Button
        size="sm"
        mt={2}
        colorScheme={task.status === 'completed' ? 'gray' : 'green'}
        onClick={() => handleStatusChange(task.status === 'completed' ? 'pending' : 'completed')}
      >
        {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
    </Box>
  );
};