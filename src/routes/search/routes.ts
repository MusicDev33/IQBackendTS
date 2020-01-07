import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.controller';

router.get('/everything/:searchterm', RouteFunctions.globalSearchRoute);
router.get('/sources/:searchterm', RouteFunctions.searchSourcesRoute);
router.get('/subjects/:searchterm', RouteFunctions.searchSubjectsRoute);

const SearchRoutes = router;
export default SearchRoutes;
