import db from '../utils/dbConnect';
import { v4 as uuidv4 } from 'uuid';
const postFile = (
  userId: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const fileId = uuidv4();
  console.log(userId);
  const query =
    'INSERT INTO files ( id, file_name, tag, theme_color, created_at, updated_at, user_id) VALUES (?, ?, ?, ?, NOW(), NOW(), ?)';
  const value = [fileId, '이름이 없는 파일', null, 'purple', userId];

  db.query(query, value, (err, result) => {
    if (err) {
      console.error('file 테이블에 추가하지 못했습니다.', err);
      return callback(err);
    }
    callback(null, result);
  });
};

export default { postFile };
