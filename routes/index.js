import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

// Router instance
const router = express.Router();

router.get('/status', getStatus);
router.get('/stats', getStats);

// 'Endpoint' permettant la création ya 'user' wa mupya
api.post('/users', UsersController.postNew);

export default router;
