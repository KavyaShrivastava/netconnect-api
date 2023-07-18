import asyncHandler from "express-async-handler";
import Contacts from "../model/Contacts.js"
import User from "../model/User.js";
import Tasks from "../model/Tasks.js";

export const createTasksCtrl = asyncHandler(async(req, res)=> {
   const {contact, reminderDateTime, message} = req.body;
   const user = await User.findById(req?.userAuthId);


   const task = await Tasks.create({
    user: user._id,
    contact, 
    reminderDateTime, 
    message
   })

   user.tasks.push(task?._id)
   await user.save();

   res.status(201).json({
    status: "success",
    message: "Task created successfully",
    task
   })
})

export const getAllTasksCtrl = asyncHandler(async(req, res)=> {
    const tasks = await Tasks.find({user: req?.userAuthId})
    if(tasks.length == 0){
        return res.status(404).json({
            success: false,
            message: "No tasks found for the user",
            tasks: [],
          });
    }
    res.status(200).json({
        success: true,
        message: "Tasks for the user",
        tasks,
    });
})