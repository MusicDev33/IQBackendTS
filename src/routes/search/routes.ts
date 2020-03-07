import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.controller';

router.get('/everything/:searchterm', RouteFunctions.globalSearchRoute);
router.get('/sources/:searchterm', RouteFunctions.searchSourcesRoute);
router.get('/subjects/:searchterm', RouteFunctions.searchSubjectsRoute);
router.get('/questions/:searchterm', RouteFunctions.searchQuestionRoute);

const SearchRoutes = router;
export default SearchRoutes;
