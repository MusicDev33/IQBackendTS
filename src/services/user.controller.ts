import { User } from '../models/user.model';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Singleton pattern, still not sure how I feel about it
export default class UserController {
  private static instance: UserController;

  private constructor() {}

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }

  public async addUser(req: Request, res: Response) {
    try {
      let newUser = new User(req.body);

      let savedUser = await newUser.save();
      console.log(savedUser);
      console.log('Saved!')
      return res.json({success: true, user: savedUser});
    } catch (err) {
      console.log('Error: ' + err);
      return res.json({success: false, msg: err});
    }
  }

  public async findOneUserByParameter(req: Request, res: Response) {
    try {
      let query: any = {};
      query[req.params.qparam] = req.params.paramvalue;
      let foundUser = await User.findOne(query).exec();
      return res.json({success: true, user: foundUser});
    } catch (err) {
      return res.json({success: false, msg: err});
    }
  }
}
