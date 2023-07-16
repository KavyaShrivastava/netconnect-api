import express from 'express'
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';
import userRouter from '../routes/usersRoute.js';
import { globalErrorHandler, notFoundHandler } from '../middlewares/globalErrorHandler.js';
import contactsRouter from '../routes/contactsRoute.js';
import remindersRoute from '../routes/remindersRoute.js';
dotenv.config()

dbConnect();
const app = express();

app.use(express.json())

//routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/contact', contactsRouter)
app.use('/api/v1/reminder', remindersRoute)

//err middleware
app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app;