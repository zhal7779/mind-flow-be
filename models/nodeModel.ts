import db from '../utils/dbConnect';

const selectNode = (
  file_id: string,
  callback: (err: Error | null, result?: any) => void
) => {
  const queryFile = 'SELECT * FROM files WHERE file_id = ? ';
  const queryNode = 'SELECT * FROM nodes WHERE file_id = ? ';

  // files 테이블에 데이터 호출
  db.query(queryFile, [file_id], (fileErr, fileResult) => {
    if (fileErr) {
      console.error('files 호출 오류:', fileErr);
      return callback(fileErr);
    }

    // nodes 테이블에 데이터 호출
    db.query(queryNode, [file_id], (nodeErr, nodeResult) => {
      if (nodeErr) {
        console.error('nodes 호출 오류:', nodeErr);
        return callback(nodeErr);
      }

      callback(null, { file: fileResult, node: nodeResult });
    });
  });
};

export default { selectNode };
