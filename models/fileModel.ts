import db from '../utils/dbConnect';
import { v4 as uuidv4 } from 'uuid';

const selectFiles = (
  userId: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const query = 'SELECT * FROM files WHERE user_id = ?';
  db.query(query, userId, (err, result) => {
    if (err) {
      console.error('file 테이블을 불러오지 못했습니다.', err);
      return callback(err);
    }
    callback(null, result);
  });
};

const selectFileTag = (
  userId: string,
  tag: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const query = 'SELECT * FROM files WHERE user_id = ? AND tag = ?';
  db.query(query, [userId, tag], (err, result) => {
    if (err) {
      console.error(`${tag} 테이블을 불러오지 못했습니다.`, err);
      return callback(err);
    }
    callback(null, result);
  });
};

const insertFile = (
  userId: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const fileId = uuidv4();
  const query =
    'INSERT INTO files ( file_id, file_name, tag, theme_color, created_at, updated_at, user_id, storage) VALUES (?, ?, ?, ?, NOW(), NOW(), ?, ?)';
  const value = [fileId, '이름이 없는 파일', null, 'purple', userId, false];

  db.query(query, value, (err, result) => {
    if (err) {
      console.error('file 테이블에 추가하지 못했습니다.', err);
      return callback(err);
    }
    callback(null, result);
  });
};

const updateFileTag = (
  userId: string,
  newTagData: { tag: string; file_id: string },
  callback: (err: Error | null, result?: any) => void
) => {
  const { tag, file_id } = newTagData;
  const query =
    'UPDATE files SET tag = ? WHERE file_id = ? AND user_id = ? AND storage = false';

  db.query(query, [tag, file_id, userId], (err, result) => {
    if (err) {
      console.error('tag 필드를 업데이트하지 못했습니다.', err);
      return callback(err);
    }
    callback(null, result);
  });
};

const updateFileThemeColor = (
  userId: string,
  updateThemeData: {
    file_id: string;
    theme_color: string;
  },

  callback: (err: Error | null, result?: any) => void
) => {
  const { theme_color, file_id } = updateThemeData;
  const query =
    'UPDATE files SET theme_color = ? WHERE file_id = ? AND user_id = ? storage = false';
  db.query(query, [theme_color, file_id, userId], (err, result) => {
    if (err) {
      console.error('theme_color 필드를 업데이트하지 못했습니다.', err);
      return callback(err);
    }
    callback(null, result);
  });
};

export default {
  selectFiles,
  selectFileTag,
  insertFile,
  updateFileTag,
  updateFileThemeColor,
};
