const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { 
      type: String, 
      enum: ['planning', 'ongoing', 'completed'], 
      default: 'planning' 
    }
  }, { timestamps: true });
  