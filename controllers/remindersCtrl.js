import asyncHandler from "express-async-handler";
import Contacts from "../model/Contacts.js"
import User from "../model/User.js";
import Reminder from "../model/Reminders.js";

export const createRemindersCtrl = asyncHandler(async(req, res)=> {
   const {contact, reminderDateTime, message} = req.body;
   const user = await User.findById(req?.userAuthId);


   const reminder = await Reminder.create({
    user: user._id,
    contact, 
    reminderDateTime, 
    message
   })

   user.reminders.push(reminder?._id)
   await user.save();

   res.status(201).json({
    status: "success",
    message: "Reminder created successfully",
    reminder
   })
})

export const getAllRemindersCtrl = asyncHandler(async(req, res)=> {
    const reminders = await Reminder.find({user: req?.userAuthId})
    if(reminder.length == 0){
        return res.status(404).json({
            success: false,
            message: "No reminders found for the user",
            reminders: [],
          });
    }
    res.status(200).json({
        success: true,
        message: "Reminders for the user",
        reminders,
    });
})