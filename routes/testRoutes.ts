import express from 'express';
import testController from '../controllers/testController';

const router = express.Router();

router.get('/', testController.getTest);

router.post('/', testController.addTest);

export default router;
