import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1]; //토큰만 추출

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err) => {
      if (err) {
        res.status(401).json({ error: '회원이 인증되지 않았습니다.' });
      } else {
        next(); //토큰이 정상적으로 인증되면 next()를 통해 다음 미들웨어로 넘어감
      }
    });
  } else {
    res.status(401).json({ error: '회원이 인증되지 않았습니다.' });
  }
};
