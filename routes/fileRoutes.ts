import express from 'express';
import fileController from '../controllers/fileController';
import { authenticateUser } from '../middleware/authenticateUser';

const router = express.Router();

// 파일 생성
router.post('/', authenticateUser, fileController.postFile);

//파일 태그 수정
router.patch('/update/tag', authenticateUser, fileController.patchFileTag);

export default router;
