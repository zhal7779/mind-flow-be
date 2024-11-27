import { Request, Response } from 'express';
import fileService from '../services/fileService';

const postFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId; // 미들웨어에서 설정한 userId 가져옴
    await fileService.postFile(userId);
    res.status(200).json('파일이 생성되었습니다.');
  } catch (error) {
    res.status(500).send({ message: '파일 생성에 실패했습니다.' });
  }
};

const patchFileTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTagData = req.body;
    const userId = res.locals.userId;
    await fileService.patchFileTag(userId, newTagData);
    res.status(200).json('태그가 업데이트 되었습니다.');
  } catch (error) {
    res.status(500).send({ message: '태그 업데이트에 실패했습니다.' });
  }
};

export default { postFile, patchFileTag };
