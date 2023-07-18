import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createTasksCtrl } from '../controllers/tasksCtrl.js';

const tasksRoute = express.Router()

tasksRoute.post('/create',  isLoggedIn, createTasksCtrl);

export default tasksRoute;