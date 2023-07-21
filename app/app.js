import express from 'express'
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';
import userRouter from '../routes/usersRoute.js';
import { globalErrorHandler, notFoundHandler } from '../middlewares/globalErrorHandler.js';
import contactsRouter from '../routes/contactsRoute.js';
import tasksRoute from '../routes/tasksRoute.js';
import cors from "cors";
dotenv.config()

dbConnect();
const app = express();

app.use(cors())

app.use(express.json())

//routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/contact', contactsRouter)
app.use('/api/v1/tasks', tasksRoute)

//err middleware
app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app;