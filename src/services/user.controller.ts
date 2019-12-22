import { User } from '../models/user.model';
import { Request, Response } from 'express';
import IControllerResponse from "@interfaces/IControllerResponse";

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

  public async findOneUserByParameter(param: string, paramValue: string): Promise<IControllerResponse> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundUser = await User.findOne(query).exec();
      if (foundUser) {
        return {success: true, payload: foundUser};
      } else {
        return {success: false, msg: 'Could not find user that matches \'' + param + '\' = \'' + paramValue + '\''};
      }
    } catch (err) {
      return {success: false, msg: err};
    }
  }

}
