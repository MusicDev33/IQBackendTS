import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './questionroutes.controller';

router.post('/add', passport.authenticate('jwt', {session: false}), RouteFunctions.addQuestionRoute);
router.post('/:questionid/answers/add', passport.authenticate('jwt', {session: false}), RouteFunctions.addAnswerToQuestionRoute);
router.get('/param/:param/:paramvalue', RouteFunctions.getQuestionByParamRoute);
router.get('/params/:param/:paramvalue', RouteFunctions.getQuestionsByParamRoute);

router.put('/set/:questionid/:setparam', RouteFunctions.setQuestionPropertyRoute);

const QuestionRoutes = router;
export default QuestionRoutes;
