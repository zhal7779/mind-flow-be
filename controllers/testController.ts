import { Request, Response } from 'express';
import testService from '../services/testService';

const getTest = async (req: Request, res: Response) => {
  try {
    const test = await testService.getTest();
    res.json(test);
  } catch (error) {
    res.status(500).send('테스트 데이터 가져오기 오류');
  }
};

const addTest = async (req: Request, res: Response): Promise<void> => {
  const newTest = req.body;
  await testService.addTest(newTest);
  res.json(201).send('성공');
  try {
  } catch (error) {
    res.status(500).send('테스트 데이터 추가하기 오류');
  }
};

export default {
  getTest,
  addTest,
};
