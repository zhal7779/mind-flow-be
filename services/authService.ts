import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel';

const getUser = async () => {
  return new Promise((resolve, reject) => {
    userModel.selectUsers((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const postUser = async (newUser: {
  id: string;
  password: string;
  name: string;
}) => {
  return new Promise((resolve, reject) => {
    userModel.insertUser(newUser, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// 로그인 처리
const postLogin = async (loginData: { id: string; password: string }) => {
  return new Promise((resolve, reject) => {
    userModel.selectUserById(loginData.id, async (err, result) => {
      if (err) {
        return reject(err);
      }

      if (!result || result.length === 0) {
        return reject(new Error('유효하지 않은 사용자입니다.'));
      }

      const user = result[0];

      // 비밀번호 확인
      const isMatch = await bcrypt.compare(loginData.password, user.password);
      if (!isMatch) {
        return reject(new Error('비밀번호가 틀렸습니다.'));
      }

      // Access 토큰 생성
      const accessToken = jwt.sign(
        { userId: user.id, username: user.name },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: '1h' } // 1시간 동안 유효
      );

      // Refresh 토큰 생성
      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET_KEY!,
        { expiresIn: '7d' } // 7일 동안 유효
      );
      resolve({ accessToken, refreshToken });
    });
  });
};

export default { getUser, postUser, postLogin };
