import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

import UserController from '@services/user.controller';
const userController = UserController.getInstance();

router.post('/register', userController.addUser);

router.get('/param/:qparam/:paramvalue', userController.findOneUserByParameter);

const UserRoutes = router;
export default UserRoutes;
