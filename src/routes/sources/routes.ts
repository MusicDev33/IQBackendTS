import express from 'express';
const router = express.Router();
import passport from 'passport';
import * as RouteFunctions from './routes.controller';

router.get('/', RouteFunctions.getAllSourcesRoute);
router.get('/:sourceid/questions', RouteFunctions.getQuestionsFromSourceRoute);
router.get('/url/:sourceurl', RouteFunctions.getSourceByURLRoute);
router.post('/add', RouteFunctions.addSourceRoute);

router.post('/:sourceid/tags/:tagname', RouteFunctions.addTagRoute);

router.delete('/:sourceid/tags/:tagname', RouteFunctions.deleteTagRoute);

const SourceRoutes = router;
export default SourceRoutes;
