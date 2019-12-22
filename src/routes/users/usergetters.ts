import UserController from '@services/user.controller';
import { Request, Response } from 'express';
import IControllerResponse from '@interfaces/IControllerResponse';

const userController = UserController.getInstance();

const getUserByParamRoute = (req: Request, res: Response) => {
  userController.findOneUserByParameter(req.params.qparam, req.params.paramvalue).then((result: IControllerResponse) => {
    let response = {};
    if (result.payload){ response = {success: result.success, user: result.payload}; }
    if (result.msg) { response = {success: result.success, msg: result.msg}; }
    return res.json(response);
  });
}

export { getUserByParamRoute };
