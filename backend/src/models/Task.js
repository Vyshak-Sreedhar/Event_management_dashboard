const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'completed'], 
      default: 'pending' 
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  }, { timestamps: true });
  
  export const User = mongoose.model('User', userSchema);
  export const Event = mongoose.model('Event', eventSchema);
  export const Task = mongoose.model('Task', taskSchema);