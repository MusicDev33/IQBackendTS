import { PassportStatic } from 'passport'
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { IUser } from '@models/user.model';
import UserController from '@services/user.controller';
import { dbConfig } from '@config/database';

export const userPassportAuth = async function(passport: PassportStatic) {
  let options: StrategyOptions = {
    secretOrKey: dbConfig.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
  };

  passport.use(new Strategy(options, async (jwtPayload: IUser, next: any) => {
    const foundUserResults = await UserController.getInstance().findOneUserByParameter('_id', jwtPayload._id);
    if (foundUserResults.success && foundUserResults.payload) {
      return next(null, foundUserResults.payload);
    } else {
      return next(null, false);
    }
  }))
}
