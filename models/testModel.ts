import db from '../utils/dbConnect';
import { RowDataPacket } from 'mysql2';

interface Itest {
  id: number;
  name: string;
}

const getTest = (
  callback: (err: Error | null, result?: Itest[]) => void
): void => {
  const query = 'SELECT * FROM test';

  db.query(query, (err, result: RowDataPacket[]) => {
    if (err) {
      console.error('test 테이블을 가져오지 못했습니다.', err);
      return callback(err);
    }
    callback(null, result as Itest[]);
  });
};

const addTest = (
  testData: { name: string },
  callback: (err: Error | null, result?: any) => void
): void => {
  const query = 'INSERT INTO test (name) VALUSE(?, ?)';
  db.query(query, [testData.name], (err, result) => {
    if (err) {
      console.error('test 테이블에 추가하지 못했습니다.', err);
      return callback(err);
    }
    callback(null, result);
  });
};

export default { getTest, addTest };
