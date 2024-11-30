import db from '../utils/dbConnect';

const selectNode = (
  userId: string,
  file_id: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const query = 'SELECT * FROM nodes WHERE file_id = ? ';
  db.query(query, [userId, file_id], (err, result) => {
    if (err) {
      console.error('노드 읽기 오류:', err);
      return callback(err);
    }
    callback(null, result);
  });
};

export default { selectNode };
