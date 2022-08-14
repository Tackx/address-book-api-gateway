import express from 'express';
import { dataLimit } from '../utils/limiter';
import { DefaultController } from '../controllers/default.controller';

const router = express.Router();

router.route('/').get(dataLimit, DefaultController.welcomeMessage);

export default router;
