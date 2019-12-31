import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './questionroutes.controller';

router.post('/add', passport.authenticate('jwt', {session: false}), RouteFunctions.addQuestionRoute);
router.post('/:questionid/answers/add', passport.authenticate('jwt', {session: false}), RouteFunctions.addAnswerToQuestionRoute);
router.post('/:questionid/:userid/:answerid/vote', passport.authenticate('jwt', {session: false}), RouteFunctions.addVoteToAnswerRoute);

router.get('/:questionid/answers', RouteFunctions.getQuestionAnswers);
router.get('/param/:param/:paramvalue', RouteFunctions.getQuestionByParamRoute);
router.get('/params/:param/:paramvalue', RouteFunctions.getQuestionsByParamRoute);
router.get('/:questionid/answers/:userid/votes', RouteFunctions.getUserVotesRoute);

router.put('/set/:questionid/:setparam', RouteFunctions.setQuestionPropertyRoute);

router.delete('/:questionid/answers/:answerid', passport.authenticate('jwt', {session: false}), RouteFunctions.deleteAnswerRoute);

const QuestionRoutes = router;
export default QuestionRoutes;
