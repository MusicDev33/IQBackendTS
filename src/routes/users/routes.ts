import express from 'express';
const router = express.Router();
import rateLimit = require('express-rate-limit');
import * as RouteFunctions from './usergetters';


import UserController from '@services/user.controller';
const userController = UserController.getInstance();

const registerLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 100 requests
  message:
    'Too many accounts created from this IP, please try again after an hour'
});

const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // start blocking after 60 requests
  message:
    'Too many login attempts have been made'
});


// ROUTES

router.post('/register', registerLimit, userController.addUser);

router.get('/param/:qparam/:paramvalue', RouteFunctions.getUserByParamRoute);


const UserRoutes = router;
export default UserRoutes;
