import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createTasksCtrl, getTaskWithParticularContact } from '../controllers/tasksCtrl.js';

const tasksRoute = express.Router()

tasksRoute.post('/create',  isLoggedIn, createTasksCtrl);
tasksRoute.get('/:contact', isLoggedIn, getTaskWithParticularContact)

export default tasksRoute;