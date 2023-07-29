import express from 'express'
import { verifyTokenController } from '../controllers/verificationCtrl.js';

const verifyTokenRoute = express();

verifyTokenRoute.post('/verifytoken', verifyTokenController);

export default verifyTokenRoute