import { Request, Response } from 'express';
import fileService from '../services/fileService';

const postFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id; // 미들웨어에서 설정한 userId 가져오기
    if (!userId) {
      res.status(400).json({ message: '유효하지 않은 사용자입니다.' });
      return;
    }

    await fileService.postFile(userId);
    res.status(200).json({ message: '파일이 생성되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '파일 생성에 실패했습니다.' });
  }
};

export default { postFile };
