import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded: any) => {
      if (err) {
        res.status(401).json({ error: '회원이 인증되지 않았습니다.' });
      } else {
        // 토큰에서 추출한 유저 ID를 res.locals에 저장
        res.locals.userId = decoded.userId;

        next();
      }
    });
  } else {
    res.status(401).json({ error: '회원이 인증되지 않았습니다.' });
  }
};
