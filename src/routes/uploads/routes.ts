import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './route.controller';

router.post('/question/img',
  RouteFunctions.uploadQuestionImage,
  passport.authenticate('jwt', {session: false}),
  RouteFunctions.uploadQuestionRoute
);

const UploadRoutes = router;
export default UploadRoutes;
