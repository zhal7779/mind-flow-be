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
  const nodeId = Math.floor(Math.random() * 100000);
  const queryFile =
    'INSERT INTO files (file_id, file_name, tag, theme_color, created_at, updated_at, user_id, storage) VALUES (?, ?, ?, ?, NOW(), NOW(), ?, ?)';
  const queryNode =
    'INSERT INTO nodes (node_id, file_id, value, node, level, position, parent_node, left_child, right_child) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  const fileValues = [
    fileId,
    '이름이 없는 파일',
    null,
    'purple',
    userId,
    false,
  ];
  const nodeValues = [
    nodeId,
    fileId,
    '',
    0,
    0,
    JSON.stringify({ x: 0, y: 0, r: 0, t: 0 }),
    JSON.stringify({ node: -1, position: { x: 0, y: 0, r: 0, t: 0 } }),
    JSON.stringify([]),
    JSON.stringify([]),
  ];

  // files 테이블에 데이터 삽입
  db.query(queryFile, fileValues, (fileErr) => {
    if (fileErr) {
      console.error('files 삽입 오류:', fileErr);
      return callback(fileErr);
    }

    // nodes 테이블에 데이터 삽입
    db.query(queryNode, nodeValues, (nodeErr) => {
      if (nodeErr) {
        console.error('nodes 삽입 오류:', nodeErr);
        return callback(nodeErr);
      }

      // 성공적으로 삽입 완료
      callback(null, fileId);
    });
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
  file_list: string[],
  callback: (err: Error | null, result?: any) => void
) => {
  const placeholders = file_list.map(() => '?').join(', ');

  const query = `UPDATE files SET deleted_at = NULL,  scheduled_deletion_at = NULL, storage = false WHERE 
      file_id IN (${placeholders}) 
      AND user_id = ?`;

  const params = [...file_list, userId];
  db.query(query, params, (err, result) => {
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
  const placeholders = file_list.map(() => '?').join(', ');

  const query = `
    UPDATE files 
    SET 
      deleted_at = NOW(), 
      scheduled_deletion_at = DATE_ADD(NOW(), INTERVAL 30 DAY), 
      storage = true 
    WHERE 
      file_id IN (${placeholders}) 
      AND user_id = ?
  `;

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
