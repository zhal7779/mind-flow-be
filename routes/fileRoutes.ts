import express from 'express';
import fileController from '../controllers/fileController';
import { authenticateUser } from '../middleware/authenticateUser';

const router = express.Router();

// 파일 생성
router.post('/', authenticateUser, fileController.postFile);

export default router;
