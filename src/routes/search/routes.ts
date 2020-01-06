import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.controller';

router.get('/everything/:searchterm', RouteFunctions.globalSearchRoute);

const SearchRoutes = router;
export default SearchRoutes;
