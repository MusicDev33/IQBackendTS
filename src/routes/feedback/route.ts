import express from 'express';
const router = express.Router();
import * as RouteFunctions from './route.controller';

router.post('/add', RouteFunctions.addFeedbackRoute);
