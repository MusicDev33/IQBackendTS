import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './feedroutes.controller';

router.get('/:userid', passport.authenticate('jwt', {session: false}), RouteFunctions.getUserFeedRoute);

const FeedRoutes = router;
export default FeedRoutes;
