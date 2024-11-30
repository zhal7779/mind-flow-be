import { Request, Response } from 'express';
import fileService from '../services/fileService';

const getFiles = async (req: Request, res: Response) => {
  try {
    const url = req.url;
    const userId = res.locals.userId; // 미들웨어에서 설정한 userId 가져옴
    const files = await fileService.getFiles(userId, url);
    res.json(files);
  } catch (error) {
    res.status(500).send('파일 조회에 실패했습니다.');
  }
};

const getFileTag = async (req: Request, res: Response): Promise<void> => {
  const { tag } = req.query;
  try {
    const userId = res.locals.userId;
    if (!tag || typeof tag !== 'string') {
      res.status(400).send('유효한 tag 쿼리 파라미터를 제공해주세요.');
      return;
    }

    const files = await fileService.getFileTag(userId, tag);
    res.json(files);
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).send(`${tag} 파일 조회에 실패했습니다.`);
  }
};

const postFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId;
    const file_id = await fileService.postFile(userId);

    res.status(200).json({
      success: true,
      code: 400,
      data: { file_id },
      msg: '파일이 생성되었습니다.',
    });
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

const patchFileName = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateFileNameData = req.body;
    const userId = res.locals.userId;
    await fileService.patchFileName(userId, updateFileNameData);
    res.status(200).json('파일 이름이 변경되었습니다.');
  } catch (error) {
    res.status(500).send({ message: '파일 이름이 변경되지 않았습니다.' });
  }
};
const patchFileStorage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_list } = req.body;
    const userId = res.locals.userId;
    await fileService.patchFileStorage(userId, file_list);
    res.status(200).json('파일이 성공적으로 복구되었습니다.');
  } catch (error) {
    res.status(500).send({ message: '파일 복구 중 오류가 발생했습니다.' });
  }
};

const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { file_list } = req.body;
    const userId = res.locals.userId;
    await fileService.deleteFile(userId, file_list);
    res.status(200).json('파일이 성공적으로 보관함에 이동되었습니다.');
  } catch (error) {
    res.status(500).send({ message: '파일 삭제 중 오류가 발생했습니다.' });
  }
};

export default {
  getFiles,
  getFileTag,
  postFile,
  patchFileTag,
  patchFileThemeColor,
  patchFileName,
  patchFileStorage,
  deleteFile,
};
