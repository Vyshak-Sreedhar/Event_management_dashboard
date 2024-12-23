export const createTask = async (req, res) => {
    try {
      const task = new Task({
        ...req.body,
        event: req.body.eventId
      });
      await task.save();
      
      // Emit socket event for real-time updates
      req.app.get('io').emit('taskCreated', task);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const updateTaskStatus = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      
      if (!task) return res.status(404).json({ error: 'Task not found' });
      
      // Emit socket event for real-time updates
      req.app.get('io').emit('taskUpdated', task);
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };