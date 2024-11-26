import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: '회원이 인증되지 않았습니다.' });
      } else {
        // decoded 객체에 있는 userId 추출
        const decodedToken = decoded as { userId: string }; // 토큰 payload 구조에 따라 변경
        req.user = { id: decodedToken.userId }; // req.user에 userId 저장
        next(); // 다음 미들웨어로 진행
      }
    });
  } else {
    res.status(401).json({ error: '회원이 인증되지 않았습니다.' });
  }
};
