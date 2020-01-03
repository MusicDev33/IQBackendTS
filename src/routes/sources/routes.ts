import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './routes.controller';

router.get('/', RouteFunctions.getAllSourcesRoute);
router.get('/:sourceid/questions', RouteFunctions.getQuestionsFromSourceRoute);
router.get('/url/:sourceurl', RouteFunctions.getSourceByURLRoute);
router.post('/add', RouteFunctions.addSourceRoute);

const SourceRoutes = router;
export default SourceRoutes;
