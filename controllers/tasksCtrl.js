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
        return res.json({
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

export const getTaskWithParticularContact = asyncHandler(async(req, res)=> {

        const contactId = req?.params?.contact
        const tasks = await Tasks.find({contact : contactId})
        res.status(200).json({ 
            success: true,
            tasks });

})

export const updateTaskCtrl = asyncHandler(async(req, res)=> {
    const {reminderDateTime, message, isCompleted} = req.body;

    const task = await Tasks.findByIdAndUpdate(
        req.params.id,
        {
            reminderDateTime, message, isCompleted

        },
        {
            new: true,
        },
    )
    
    const updateTask = JSON.parse(JSON.stringify(task)); // Convert the task to a plain JavaScript object

    if (!task) {
        return res.status(404).json({
          status: "error",
          message: "Task not found",
        });
    }
    res.json({
        status: "success",
        message: "task updated successfully",
        task: updateTask
      });


})

export const deleteMultipleTasksCtrl = asyncHandler(async(req, res)=> {
    const {taskIds} = req?.body;
    const deletionResult = await Tasks.deleteMany({ _id: { $in: taskIds } });
    if (deletionResult.deletedCount > 0) {
        return res.json({
          success: true,
          message: `${deletionResult.deletedCount} tasks deleted successfully.`,
        })
      } else {
        return res.json({
          success: false,
          message: "No tasks were found with the provided IDs.",
        })
      }
})