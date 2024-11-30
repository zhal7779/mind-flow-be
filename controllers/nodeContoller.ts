import nodeService from '../services/nodeService';
import { Request, Response } from 'express';

const getNode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_id } = req.query;
    const userId = res.locals.userId;

    if (!file_id || typeof file_id !== 'string') {
      res.status(400).send('유효한 file_id 쿼리 파라미터를 제공해주세요.');
      return;
    }

    const data = await nodeService.getNode(userId, file_id);
    console.log(data);
    res.status(200).json({
      success: true,
      code: 200,
      data: { data },
      msg: '파일이 생성되었습니다.',
    });
  } catch (error) {
    res.status(500).send({ message: '파일 생성에 실패했습니다.' });
  }
};

export default { getNode };
