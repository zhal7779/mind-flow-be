import express from 'express';
import fileController from '../controllers/fileController';
import { authenticateUser } from '../middleware/authenticateUser';

const router = express.Router();

//파일 전체 불러오기
router.get('/', authenticateUser, fileController.getFiles);

// 파일 생성
router.post('/create', authenticateUser, fileController.postFile);

//파일 태그 수정
router.patch('/update/tag', authenticateUser, fileController.patchFileTag);

//파일 테마 색상 수정
router.patch(
  '/update/themecolor',
  authenticateUser,
  fileController.patchFileThemeColor
);

export default router;
