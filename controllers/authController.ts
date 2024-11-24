import { Request, Response } from 'express';
import authService from '../services/authService';

const getUser = async (req: Request, res: Response) => {
  try {
    const test = await authService.getUser();
    res.json(test);
  } catch (error) {
    res.status(500).send('유저 데이터 가져오기 오류');
  }
};

const postUser = async (req: Request, res: Response): Promise<void> => {
  const newUser = req.body;
  await authService.postUser(newUser);
  res.json(201).send('성공');
  try {
  } catch (error) {
    res.status(500).send('유저 데이터 추가하기 오류');
  }
};

export default {
  getUser,
  postUser,
};
