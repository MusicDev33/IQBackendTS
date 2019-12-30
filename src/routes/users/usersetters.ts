import { User } from '@models/user.model';
import UserController from '@services/user.controller';
import { Request, Response } from 'express';
import IControllerResponse from '@interfaces/IControllerResponse';

const userController = UserController.getInstance();

export const setUserPropertyRoute = async (req: Request, res: Response) => {
  // There are two params: userid, for getting the User, and setparam, which is the param we want to change here
  // The body has paramValue, which is the value we want to set the param to.
  // Example: /users/set/basgf89254hqetnj/bio will find a user with _id of 'basgf89254hqetnj'
  // and set that user's 'bio' property to whatever is in paramValue

  const foundUserResult = await userController.findOneUserByParameter('_id', req.params.userid);
  if (foundUserResult.payload) {
    const user = foundUserResult.payload;
    user[req.params.setparam] = req.body.paramValue;

    const savedUserResult = await userController.saveUser(user, req.params.setparam);
    console.log(savedUserResult);
    return res.json(savedUserResult);
  } else {
    return res.json(foundUserResult);
  }
}
