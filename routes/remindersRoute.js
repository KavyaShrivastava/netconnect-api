import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createRemindersCtrl } from '../controllers/remindersCtrl.js';

const remindersRoute = express.Router()

remindersRoute.post('/create',  isLoggedIn, createRemindersCtrl);

export default remindersRoute;