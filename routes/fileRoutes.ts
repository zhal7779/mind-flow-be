import express from 'express';
import fileController from '../controllers/fileController';
import { authenticateUser } from '../middleware/authenticateUser';

const router = express.Router();

//파일 전체 불러오기
router.get('/', authenticateUser, fileController.getFiles);

//파일 즐겨찾기 불러오기
router.get('/bookmark', authenticateUser, fileController.getFileTag);
//휴지통 파일 불러오기
router.get('/storage', authenticateUser, fileController.getFiles);

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
//파일 이름 수정
router.patch('/update/name', authenticateUser, fileController.patchFileName);

router.delete('/delete/:file_id', authenticateUser, fileController.deleteFile);
export default router;
