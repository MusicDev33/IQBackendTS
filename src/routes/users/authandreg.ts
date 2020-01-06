import { validateRegister } from './validators';
import { dbConfig } from '@config/database';
import { User } from '@models/user.model';
import jwt = require('jsonwebtoken');
import UserController from '@services/user.controller';
import { Request, Response } from 'express';
import IControllerResponse from '@interfaces/IControllerResponse';

const userController = UserController.getInstance();

export const registerUserRoute = (req: Request, res: Response) => {
  if (!validateRegister(req.body)) {
    return res.json({success: false, msg: 'You probably filled out a form incorrectly.'});
  }

  const newUser = new User({
    fbTokens: [],
    name: req.body.firstName + ' ' + req.body.lastName,
    email: req.body.email.toLowerCase(),
    handle: req.body.handle,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    bio: '',
    profileImage: '',
    customization: {},
    currentSubjects: [],
    currentSources: [],
    profileHits: 0,
    knowledge: {},
    googleID: ''
  });

  userController.addUser(newUser).then((result: IControllerResponse) => {
    let response = {};
    if (result.msg) { response = {success: result.success, msg: result.msg}; }
    console.log(response);
    return res.json(response);
  });
};

export const authenticateUserRoute = async (req: Request, res: Response) => {
  const login = req.body.login.toLowerCase();
  const password = req.body.password;
  let userResponse;
  let isMatchResponse: IControllerResponse;

  if (password.length === 0) {
    return res.json({success: false, msg: 'Must input password'});
  }

  if (login.indexOf('@') > -1) {
    userResponse = await userController.findOneUserByParameter('email', login);
  } else {
    userResponse = await userController.findOneUserByParameter('handle', login);
  }

  if (userResponse.success && userResponse.payload) {
    const user = userResponse.payload;
    isMatchResponse = await userController.comparePassword(password, user.password);
    if (isMatchResponse.success) {
      delete user.password;
      user['id'] = user._id;
      delete user.paidProgram;
      const jwtToken = jwt.sign(user.toJSON(), dbConfig.secret, {expiresIn: 28800}); // Expires in 8 hours
      return res.json({success: true, token: 'JWT ' + jwtToken, user: user});
    } else {
      res.json({success: false, msg: 'Wrong password!'});
    }
  } else {
    res.json(userResponse);
  }
};
