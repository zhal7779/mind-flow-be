import { Request, Response } from 'express';
import authService from '../services/authService';

//회원정보 전체 조회
const getUser = async (req: Request, res: Response) => {
  try {
    const users = await authService.getUser();
    res
      .status(200)
      .json({ data: users, success: true, code: 200, msg: 'success' });
  } catch (error) {
    res.status(500).json({
      success: false,
      code: 500,
      msg: '회원정보 조회에 실패했습니다.',
    });
  }
};
//회원가입
const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body;
    await authService.postUser(newUser);

    res.status(200).json({
      data: null,
      success: true,
      code: 200,
      msg: 'success',
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, code: 500, msg: '회원가입에 실패했습니다.' });
  }
};

//로그인
const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, password } = req.body;

    const { accessToken, refreshToken } = await authService.postLogin({
      id,
      password,
    });

    // Refresh Token을 HttpOnly 쿠키로 설정
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // /secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서는 secure 옵션 활성화
      sameSite: 'strict', // CSRF 공격 방지
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일 동안 유효
    });

    // accessToken 반환
    res.status(200).json({
      data: accessToken,
      success: true,
      code: 200,
      msg: 'success',
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, code: 400, msg: '로그인에 실패했습니다.' });
  }
};

export default {
  getUser,
  postUser,
  postLogin,
};
