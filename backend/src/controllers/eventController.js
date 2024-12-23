import { Event } from '../models/Event.js';
import { Task } from '../models/Task.js';

export const createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user.userId
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name email')
      .populate('attendees', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('organizer attendees');
    
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};