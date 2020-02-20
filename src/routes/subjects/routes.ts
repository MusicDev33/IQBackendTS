import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './routes.controller';

router.get('/', RouteFunctions.getAllSubjectsRoute);
router.get('/:subjecturl/questions', RouteFunctions.getSubjectQuestionsRoute);
router.get('/:subjecturl', RouteFunctions.getSubjectRoute);
router.post('/:subjectname', passport.authenticate('jwt', {session: false}), RouteFunctions.createSubjectRoute);

const SubjectRoutes = router;
export default SubjectRoutes;
