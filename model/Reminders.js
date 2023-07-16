import mongoose from "mongoose";
const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  reminderDateTime: { type: Date, required: true },
  message: { type: String, required: true },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;
