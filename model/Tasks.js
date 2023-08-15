import mongoose from "mongoose";
const tasksSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true  },
  reminderDateTime: { type: Date, required: true },
  message: { type: String, required: true },
  isCompleted: {type: Boolean, default:false}
});

const Tasks = mongoose.model('Tasks', tasksSchema);

export default Tasks;
