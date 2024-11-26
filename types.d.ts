declare namespace Express {
  export interface Request {
    user?: { id: string }; // authenticateUser 미들웨어에서 추가한 user 객체
  }
}
