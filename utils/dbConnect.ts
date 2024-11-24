import mysql from 'mysql2';
import dbConfig from '../config/dbConfig';

// MySQL 연결 생성
const connection = mysql.createConnection(dbConfig);

// 연결 확인
connection.connect((err) => {
  console.log(dbConfig);
  if (err) {
    console.log(dbConfig);
    console.error('MySQL 연결 오류:', err.stack);
    return;
  }
  console.log('MySQL 연결 성공');
});

export default connection;
