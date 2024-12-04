import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

// 유저 조회
router.get('/', authController.getUser);

// 유저 생성
router.post('/', authController.postUser);

// 로그인
router.post('/login', authController.postLogin);

//로그아웃
router.post('/logout', authController.postLogin);

//토큰 재발급
router.get('/refresh', authController.postRefresh);

export default router;
