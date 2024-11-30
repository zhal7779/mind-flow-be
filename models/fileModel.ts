import db from '../utils/dbConnect';
import { v4 as uuidv4 } from 'uuid';

const selectFiles = (
  userId: string,
  url: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const isStorage = url === '/storage';
  const query =
    'SELECT * FROM files WHERE user_id = ? AND storage = ? ORDER BY updated_at DESC';
  db.query(query, [userId, isStorage], (err, result) => {
    if (err) {
      console.error('파일 읽기 오류:', err);
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
      console.error(`즐겨찾기 읽기 오류:`, err);
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
      console.error('파일 추가 오류:', err);
      return callback(err);
    }
    callback(null, fileId);
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
      console.error('파일 태그 수정 오류:', err);
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
    'UPDATE files SET theme_color = ? WHERE file_id = ? AND user_id = ? AND storage = false';
  db.query(query, [theme_color, file_id, userId], (err, result) => {
    if (err) {
      console.error('파일 테마색상 수정 오류:', err);
      return callback(err);
    }
    callback(null, result);
  });
};

const updateFileName = (
  userId: string,
  updateFileNameData: { file_id: string; file_name: string },
  callback: (err: Error | null, result?: any) => void
) => {
  const { file_name, file_id } = updateFileNameData;
  const query =
    'UPDATE files SET file_name = ? WHERE file_id = ? AND user_id = ? AND storage = false';
  db.query(query, [file_name, file_id, userId], (err, result) => {
    if (err) {
      console.error('파일 이름 수정 오류:', err);
      return callback(err);
    }
    callback(null, result);
  });
};

const updateFileStorage = (
  userId: string,
  file_id: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const query =
    'UPDATE files SET deleted_at = NULL, storage = false WHERE file_id = ? AND user_id = ?';
  db.query(query, [file_id, userId], (err, result) => {
    if (err) {
      console.error('파일 복구 오류:', err);
      return callback(err);
    }
    callback(null, result);
  });
};

const deleteFile = (
  userId: string,
  file_list: string[],
  callback: (err: Error | null, result?: any) => void
) => {
  // Convert the array of file IDs into a string format suitable for SQL query
  const placeholders = file_list.map(() => '?').join(', ');

  const query = `UPDATE files SET deleted_at = NOW(), storage = true WHERE file_id IN (${placeholders}) AND user_id = ?`;

  // Combine file IDs with the user ID in the query parameters
  const params = [...file_list, userId];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('파일 삭제 오류:', err);
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
  updateFileName,
  updateFileStorage,
  deleteFile,
};
