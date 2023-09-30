import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createTasksCtrl, deleteMultipleTasksCtrl, getAllTasksCtrl, getTaskWithParticularContact, updateTaskCtrl } from '../controllers/tasksCtrl.js';

const tasksRoute = express.Router()

tasksRoute.post('/create',  isLoggedIn, createTasksCtrl);
tasksRoute.get('/:contact', isLoggedIn, getTaskWithParticularContact)
tasksRoute.put('/:id', isLoggedIn, updateTaskCtrl)
tasksRoute.get('/', isLoggedIn, getAllTasksCtrl);
tasksRoute.delete('/delete', isLoggedIn, deleteMultipleTasksCtrl)

export default tasksRoute;