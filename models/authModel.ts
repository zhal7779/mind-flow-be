import db from '../utils/dbConnect';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

interface Iuser {
  id: string;
  name: string;
  password: string;
  created_at: string;
}

const getUser = (
  callback: (err: Error | null, result?: Iuser[]) => void
): void => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, result: RowDataPacket[]) => {
    if (err) {
      console.error('users 테이블을 가져오지 못했습니다.', err);
      return callback(err);
    }
    callback(null, result as Iuser[]);
  });
};

const postUser = async (
  userData: { id: string; name: string; password: string },
  callback: (err: Error | null, result?: any) => void
): Promise<void> => {
  try {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const query = 'INSERT INTO users (id, name, password) VALUES(?, ?, ?)';
    db.query(
      query,
      [userData.id, userData.name, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('users 테이블에 추가하지 못했습니다.', err);
          return callback(err);
        }
        callback(null, result);
      }
    );
  } catch (error) {
    console.error('비밀번호 암호화 중 오류가 발생했습니다.', error);
    callback(error as Error);
  }
};

export { getUser, postUser };
