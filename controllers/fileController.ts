import { Request, Response } from 'express';
import fileService from '../services/fileService';

const getFiles = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId; // 미들웨어에서 설정한 userId 가져옴
    const files = await fileService.getFiles(userId);
    res.json(files);
  } catch (error) {
    res.status(500).send('파일 조회에 실패했습니다.');
  }
};

const postFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId;
    await fileService.postFile(userId);
    res.status(200).json('파일이 생성되었습니다.');
  } catch (error) {
    res.status(500).send({ message: '파일 생성에 실패했습니다.' });
  }
};

const patchFileTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateTagData = req.body;
    const userId = res.locals.userId;
    await fileService.patchFileTag(userId, updateTagData);
    res.status(200).json('태그가 수정 되었습니다.');
  } catch (error) {
    res.status(500).send({ message: '태그 수정 실패했습니다.' });
  }
};

const patchFileThemeColor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updateThemeColorData = req.body;
    const userId = res.locals.userId;
    await fileService.patchFileThemeColor(userId, updateThemeColorData);
    res.status(200).json('테마 색상이 수정 되었습니다.');
  } catch (error) {
    res.status(500).send({ message: '테마 색상 수정 실패했습니다.' });
  }
};

export default { getFiles, postFile, patchFileTag, patchFileThemeColor };
