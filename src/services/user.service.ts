import { User, IUser } from '@models/user.model';
import bcryptjs = require('bcryptjs');
import IControllerResponse from "@interfaces/IControllerResponse";

// Singleton pattern, still not sure how I feel about it
class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public async addUser(newUser: IUser): Promise<IControllerResponse> {
    try {
      const existingUsers = await User.find( { $or: [{email: newUser.email}, {handle: newUser.handle}]} ).exec();
      if (existingUsers.length) {
        return {success: false, msg: 'Error - Try another handle or email'};
      }
      const salt = await bcryptjs.genSalt(13);
      const hashedPassword = await bcryptjs.hash(newUser.password, salt);
      newUser.password = hashedPassword;

      const savedUser = await newUser.save();
      if (savedUser) {
        return {success: true, msg: 'Successfully registered user!'};
      } else {
        return {success: false, msg: 'Could not save user...'};
      }
    } catch (err) {
      console.log('Error: ' + err);
      return {success: false, msg: err};
    }
  }

  public async addGoogleUser(newUser: IUser): Promise<IControllerResponse> {
    try {
      const existingUsers = await User.find( { $or: [{email: newUser.email}, {handle: newUser.handle}]} ).exec();
      if (existingUsers.length) {
        return {success: false, msg: 'Error - Try another handle or email'};
      }

      const savedUser = await newUser.save();
      if (savedUser) {
        return {success: true, msg: 'Successfully registered user!'};
      } else {
        return {success: false, msg: 'Could not save user...'};
      }
    } catch (err) {
      console.log('Error: ' + err);
      return {success: false, msg: err};
    }
  }

  public async comparePassword(userPass: string, hashedPassword: string): Promise<IControllerResponse> {
    const isMatch = await bcryptjs.compare(userPass, hashedPassword);
    if (isMatch) {
      return {success: true, msg: 'Password match'};
    } else {
      return {success: false, msg: 'Wrong password'};
    }
  }

  public async findOneUserByParameter(param: string, paramValue: string): Promise<IUser> {
    try {
      let query: any = {};
      query[param] = paramValue;
      let foundUser = await User.findOne(query).exec();
      if (foundUser) {
        return foundUser;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async saveUser(changedUser: IUser, changedParam: string): Promise<IControllerResponse> {
    changedUser.markModified(changedParam);
    try {
      const savedUser = await changedUser.save();
      if (savedUser) {
        return {success: true, msg: 'Successfully changed parameter \'' + changedParam + '\''};
      } else {
        return {success: false, msg: 'Couldn\'t change param \'' + changedParam + '\' and it\'s totally our fault. Try again?'};
      }
    } catch (err) {
      return {success: false, msg: err};
    }
  }

  public async searchUserByParam(param: string, paramValue: string): Promise<IUser[]> {
    try {
      const regexp = '^' + paramValue;
      let query: any = {};
      query[param] = {$regex: regexp, $options: 'i'}
      const users = User.find(query).lean().exec();
      return users;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const userService = UserService.getInstance();
export default userService;
