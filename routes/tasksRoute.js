import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createTasksCtrl, getAllTasksCtrl, getTaskWithParticularContact, updateTaskCtrl } from '../controllers/tasksCtrl.js';

const tasksRoute = express.Router()

tasksRoute.post('/create',  isLoggedIn, createTasksCtrl);
tasksRoute.get('/:contact', isLoggedIn, getTaskWithParticularContact)
tasksRoute.put('/:id', isLoggedIn, updateTaskCtrl)
tasksRoute.get('/', isLoggedIn, getAllTasksCtrl);

export default tasksRoute;