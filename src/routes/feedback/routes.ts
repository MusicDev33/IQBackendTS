import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.controller';

router.post('/add', passport.authenticate('jwt', {session: false}), RouteFunctions.addFeedbackRoute);

const FeedbackRoutes = router;
export default FeedbackRoutes;
