import mongoose from "mongoose";
const tasksSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  reminderDateTime: { type: Date, required: true },
  message: { type: String, required: true },
});

const Tasks = mongoose.model('Tasks', tasksSchema);

export default Tasks;