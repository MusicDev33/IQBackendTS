import jwt = require('jsonwebtoken');
import { dbConfig } from '@config/database';

import { User } from '@models/user.model';
import UserController from '@services/user.controller';
import { Request, Response } from 'express';
import IControllerResponse from '@interfaces/IControllerResponse';

const userController = UserController.getInstance();

export const googleRegisterUserRoute = async (req: Request, res: Response) => {
  if (req.body.handle.indexOf(' ') >= 0 || !req.body.handle.match(/^[a-z0-9_]+$/g)){
    return res.json({success: false, msg: "You can't have special characters in your handle. Letters must be lowercase."});
  }

  let newUser = new User({
    fbTokens: [],
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    handle: req.body.handle,
    phoneNumber: '',
    password: '',
    bio: '',
    profileImage: req.body.photoUrl,
    customization: {},
    currentSubjects: [],
    currentSources: [],
    profileHits: 0,
    knowledge: {},
    googleID: req.body.googleID
  });

  const addUserResult = await userController.addGoogleUser(newUser);
  return res.json(addUserResult);
}

export const googleAuthUserRoute = async (req: Request, res: Response) => {
  const findUserResult = await userController.findOneUserByParameter('googleID', req.body.googleID);
  if (findUserResult.success && findUserResult.payload) {
    const user = findUserResult.payload;
    delete user.password;
    const jwtToken = jwt.sign(user.toJSON(), dbConfig.secret, {expiresIn: 28800}); // Expires in 8 hours
    res.json({success: true, token: 'JWT ' + jwtToken, user: user});
  } else {
    res.json(findUserResult);
  }
}
