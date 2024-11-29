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
    res
      .status(500)
      .json({
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

    const token = await authService.postLogin({ id, password });

    // 토큰 반환
    res.status(200).json({
      data: { token: token },
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
