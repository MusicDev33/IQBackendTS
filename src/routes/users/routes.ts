import express from 'express';
const router = express.Router();
import passport from 'passport';
import rateLimit = require('express-rate-limit');
import * as RouteFunctions from './userroutes.controller';

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

router.post('/register', registerLimit, RouteFunctions.registerUserRoute);
router.post('/authenticate', authLimit, RouteFunctions.authenticateUserRoute);
router.post('/g/register', RouteFunctions.googleRegisterUserRoute);
router.post('/g/authenticate', RouteFunctions.googleAuthUserRoute);

router.get('/profile', passport.authenticate('jwt', {session: false}), RouteFunctions.getUserProfileRoute);
router.get('/public/handle/:userhandle', RouteFunctions.publicGetUserByHandleRoute);
router.get('/param/:qparam/:paramvalue', RouteFunctions.getUserByParamRoute);
router.get('/:userid/answers', RouteFunctions.getUserAnswersRoute);

router.post('/set/:userid/:setparam', passport.authenticate('jwt', {session: false}), RouteFunctions.setUserPropertyRoute);

// GETTERS
router.get('/:userid/questions', RouteFunctions.getUserQuestionsRoute);

const UserRoutes = router;
export default UserRoutes;
