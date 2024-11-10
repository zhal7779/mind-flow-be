import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import testRoutes from './routes/testRoutes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
  credentials: true, // 자격 증명 허용 (쿠키 전송 허용)
};

app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use('/api/test', testRoutes);

// app.get('/', (req: Request, res: Response): void => {
//   res.send('hello world');
// });

app.listen(8080, () => console.log('8080번 포트 '));
