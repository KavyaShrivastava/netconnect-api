import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import { createNewContactCtrl, deleteContactCtrl, getAllContactsCtrl, getSingleContactCtrl, updateContactCtrl } from '../controllers/contactsCtrl.js';


const contactsRouter = express.Router()

contactsRouter.post('/create', isLoggedIn, createNewContactCtrl)
contactsRouter.get('/', isLoggedIn, getAllContactsCtrl)
contactsRouter.get('/:id', isLoggedIn, getSingleContactCtrl)
contactsRouter.put('/update/:id', isLoggedIn, updateContactCtrl)
contactsRouter.delete('/:id', isLoggedIn, deleteContactCtrl)


export default contactsRouter
