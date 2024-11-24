import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.get('/', authController.getUser);

router.post('/', authController.postUser);

export default router;